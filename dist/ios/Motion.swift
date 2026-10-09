//
// Motion.swift
//

// Do not edit directly, this file was auto-generated.

import SwiftUI

/// A cubic-bezier easing curve from the Cosmos motion tokens (`CosmosTokens.easing*`).
/// SwiftUI only takes control points together with a duration, so pair it with a
/// duration token:
///
///     .animation(CosmosTokens.easingStandard.animation(duration: CosmosTokens.durationSm), value: isOpen)
public struct CosmosEasing: Equatable, Sendable {
    public let x1: Double
    public let y1: Double
    public let x2: Double
    public let y2: Double

    public init(x1: Double, y1: Double, x2: Double, y2: Double) {
        self.x1 = x1
        self.y1 = y1
        self.x2 = x2
        self.y2 = y2
    }

    /// A timing-curve animation that runs for `duration` seconds.
    public func animation(duration: TimeInterval) -> Animation {
        .timingCurve(x1, y1, x2, y2, duration: duration)
    }

    /// The same curve as a `UnitCurve`, for `CustomAnimation` and phase animators.
    @available(iOS 17.0, macOS 14.0, tvOS 17.0, watchOS 10.0, *)
    public var unitCurve: UnitCurve {
        .bezier(startControlPoint: UnitPoint(x: x1, y: y1), endControlPoint: UnitPoint(x: x2, y: y2))
    }
}
