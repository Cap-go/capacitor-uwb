import Foundation
import NearbyInteraction

class CapacitorUwb: NSObject, NISessionDelegate {
    private let pluginVersion = "8.0.0"
    private var session: NISession?
    weak var plugin: CapacitorUwbPlugin?

    func getPluginVersion() -> String {
        return pluginVersion
    }

    func isAvailable() -> (supported: Bool, available: Bool) {
        let supported = NISession.isSupported
        return (supported, supported)
    }

    func ensureSession() throws -> NISession {
        if let session = session {
            return session
        }

        guard NISession.isSupported else {
            throw NSError(
                domain: "CapacitorUwb",
                code: 1,
                userInfo: [NSLocalizedDescriptionKey: "Nearby Interaction is not supported on this device."]
            )
        }

        let newSession = NISession()
        newSession.delegate = self
        session = newSession
        return newSession
    }

    func getDiscoveryToken() throws -> String {
        let session = try ensureSession()

        guard let token = session.discoveryToken else {
            throw NSError(
                domain: "CapacitorUwb",
                code: 2,
                userInfo: [NSLocalizedDescriptionKey: "Failed to create a Nearby Interaction discovery token."]
            )
        }

        let data = try NSKeyedArchiver.archivedData(withRootObject: token, requiringSecureCoding: true)
        return data.base64EncodedString()
    }

    func startPeerSession(peerDiscoveryToken: String, isCameraAssistanceEnabled: Bool) throws {
        guard let tokenData = Data(base64Encoded: peerDiscoveryToken) else {
            throw NSError(
                domain: "CapacitorUwb",
                code: 3,
                userInfo: [NSLocalizedDescriptionKey: "Invalid base64 peer discovery token."]
            )
        }

        guard let peerToken = try NSKeyedUnarchiver.unarchivedObject(ofClass: NIDiscoveryToken.self, from: tokenData) else {
            throw NSError(
                domain: "CapacitorUwb",
                code: 4,
                userInfo: [NSLocalizedDescriptionKey: "Failed to decode peer discovery token."]
            )
        }

        let session = try ensureSession()
        let configuration = NINearbyPeerConfiguration(peerToken: peerToken)

        if #available(iOS 16.0, *) {
            configuration.isCameraAssistanceEnabled = isCameraAssistanceEnabled
        }

        session.run(configuration)
        plugin?.notifySessionStateChanged(state: "running")
    }

    func stopSession() {
        session?.invalidate()
        session = nil
        plugin?.notifySessionStateChanged(state: "stopped")
    }

    // MARK: - NISessionDelegate

    func session(_ session: NISession, didUpdate nearbyObjects: [NINearbyObject]) {
        guard let object = nearbyObjects.first else {
            return
        }

        plugin?.notifyRangingUpdate(object: object)
    }

    func sessionWasSuspended(_ session: NISession) {
        plugin?.notifySessionStateChanged(state: "suspended")
    }

    func sessionSuspensionEnded(_ session: NISession) {
        plugin?.notifySessionStateChanged(state: "resumed")
    }

    func session(_ session: NISession, didInvalidateWith error: Error) {
        self.session = nil
        plugin?.notifySessionStateChanged(state: "invalidated", reason: error.localizedDescription)
    }

    func session(_ session: NISession, didRemove nearbyObjects: [NINearbyObject], reason: NINearbyObject.RemovalReason) {
        plugin?.notifySessionStateChanged(state: "peerDisconnected", reason: String(describing: reason))
    }
}
