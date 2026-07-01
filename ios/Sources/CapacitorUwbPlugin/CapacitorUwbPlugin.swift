import Foundation
import Capacitor
import NearbyInteraction

@objc(CapacitorUwbPlugin)
public class CapacitorUwbPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "CapacitorUwbPlugin"
    public let jsName = "CapacitorUwb"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isAvailable", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getDiscoveryToken", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startPeerSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startControllerSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "startControleeSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "stopSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getPluginVersion", returnType: CAPPluginReturnPromise)
    ]

    private let implementation = CapacitorUwb()

    override public func load() {
        super.load()
        implementation.plugin = self
    }

    @objc func isAvailable(_ call: CAPPluginCall) {
        let status = implementation.isAvailable()
        call.resolve([
            "supported": status.supported,
            "available": status.available,
            "platform": "ios"
        ])
    }

    @objc func getDiscoveryToken(_ call: CAPPluginCall) {
        do {
            let token = try implementation.getDiscoveryToken()
            call.resolve([
                "discoveryToken": token
            ])
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func startPeerSession(_ call: CAPPluginCall) {
        guard let peerDiscoveryToken = call.getString("peerDiscoveryToken") else {
            call.reject("peerDiscoveryToken is required")
            return
        }

        let isCameraAssistanceEnabled = call.getBool("isCameraAssistanceEnabled") ?? false

        do {
            try implementation.startPeerSession(
                peerDiscoveryToken: peerDiscoveryToken,
                isCameraAssistanceEnabled: isCameraAssistanceEnabled
            )
            call.resolve()
        } catch {
            call.reject(error.localizedDescription)
        }
    }

    @objc func startControllerSession(_ call: CAPPluginCall) {
        call.reject("Controller sessions are only available on Android.")
    }

    @objc func startControleeSession(_ call: CAPPluginCall) {
        call.reject("Controlee sessions are only available on Android.")
    }

    @objc func stopSession(_ call: CAPPluginCall) {
        implementation.stopSession()
        call.resolve()
    }

    @objc func getPluginVersion(_ call: CAPPluginCall) {
        call.resolve([
            "version": implementation.getPluginVersion()
        ])
    }

    func notifyRangingUpdate(object: NINearbyObject) {
        var payload: [String: Any] = [
            "timestamp": Int(Date().timeIntervalSince1970 * 1000)
        ]

        if let distance = object.distance {
            payload["distanceMeters"] = distance
        }

        if let direction = object.direction {
            payload["direction"] = [
                "x": direction.x,
                "y": direction.y,
                "z": direction.z
            ]
        }
        if #available(iOS 16.0, *) {
            if let horizontalAngle = object.horizontalAngle {
                payload["horizontalAngleRadians"] = horizontalAngle
            }
        }

        notifyListeners("rangingUpdate", data: payload)
    }

    func notifySessionStateChanged(state: String, reason: String? = nil) {
        var payload: [String: Any] = [
            "state": state
        ]

        if let reason = reason {
            payload["reason"] = reason
        }

        notifyListeners("sessionStateChanged", data: payload)
    }
}
