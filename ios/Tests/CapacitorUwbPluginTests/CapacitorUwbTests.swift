import XCTest
@testable import CapacitorUwbPlugin

class CapacitorUwbTests: XCTestCase {
    func testGetPluginVersion() {
        let implementation = CapacitorUwb()
        let result = implementation.getPluginVersion()

        XCTAssertEqual("8.0.0", result)
    }

    func testIsAvailableReturnsTuple() {
        let implementation = CapacitorUwb()
        let result = implementation.isAvailable()

        XCTAssertEqual(result.supported, result.available || !result.supported)
    }
}
