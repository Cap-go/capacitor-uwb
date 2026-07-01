// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapgoCapacitorUwb",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapgoCapacitorUwb",
            targets: ["CapacitorUwbPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "CapacitorUwbPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/CapacitorUwbPlugin"),
        .testTarget(
            name: "CapacitorUwbPluginTests",
            dependencies: ["CapacitorUwbPlugin"],
            path: "ios/Tests/CapacitorUwbPluginTests")
    ]
)
