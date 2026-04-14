//
//  SourceSink.swift
//  Defines helper types (Vec2, Source, Sink) for 2D positions, and sources/sinks.
//    currently Stand alone
//    can use types rather than raw typles in HeleShaw.swift and Streamline.swift
//    Use toTuple and toTuples for easy integrating (convert existing arrays without rewriting GenStreamLine)
//
//  Created by Kyle Cornford on 4/5/26.
//

// Vec2 struct for 2D vector (Double-precision)
struct Vec2 {
    var x: Double // In Swift, Double is equivalent to Float64
    var y: Double

    // VEC PROPERTIES (computed) :
    // magnitude/length of vector
    var magnitude: Double {
        sqrt(x * x + y * y)
    }

    // unit vector (same direction)
    var normalized: Vec2 {
        let mag = magnitude
        guard mag > 0 else { return Vec2(x: 0, y: 0) } // return (0,0) if the vec has zero length (avoids div by 0)
        return Vec2(x: x / mag, y: y / mag)
    }

    // VEC ARITHMETIC :
    //  lhs = left hand side of operator
    //  rhs = right hand side of operator)

    // Operator (+) : Adds components together, rather than manually (vec1 + vec2)
    static func + (lhs: Vec2, rhs: Vec2) -> Vec2 {
        Vec2(x: lhs.x + rhs.x, y: lhs.y + rhs.y)
    }

    // Operator (-) : Subtracts components from eachother, rather than manually (vec1 - vec2)
    static func - (lhs: Vec2, rhs: Vec2) -> Vec2 {
        Vec2(x: lhs.x - rhs.x, y: lhs.y - rhs.y)
    }

    // Operator (*) : Scales vector (on lhs) by some scalar number (vec * someScalarNum)
    static func * (lhs: Vec2, rhs: Double) -> Vec2 {
        Vec2(x: lhs.x * rhs, y: lhs.y * rhs)
    }

    // Operator (*) : Scales vector (on rhs) by some scalar number (someScalarNum * vec) [needed for swift weirdness]
    static func * (lhs: Double, rhs: Vec2) -> Vec2 {
        Vec2(x: lhs * rhs.x, y: lhs * rhs.y)
    }

}

// flowPoint protocol (shared interface for sources and sinks)
protocol FlowPoint {
    var position: Vec2 { get set }
    var strength: Double { get set }

    // flow point in raw tuple format (x, y, strength)
    var toTuple: (Double, Double, Double) { get } // (GenStreamLine...) [ease of use]
}

extension FlowPoint {
    var toTuple: (Double, Double, Double) {
        (position.x, position.y, strength)
    }
}

// SOURCE (Strength [flow rate mm^2/s] outward is positive)
//  Streamline.swift handles with addition
struct Source: FlowPoint {
    var position: Vec2
    var strength: Double

    init(x: Double, y: Double, strength: Double) {
        self.position = Vec2(x: x, y: y)
        self.strength = strength
    }

    init(position: Vec2, strength: Double) {
        self.position = position
        self.strength = strength
    }
}

// SINK (Strength [flow rate mm^2/s] inward is positive)
//  Streamline.swift handles with subtraction
struct Sink: FlowPoint {
    var position: Vec2
    var strength: Double

    init(x: Double, y: Double, strength: Double) {
        self.position = Vec2(x: x, y: y)
        self.strength = strength
    }

    init(position: Vec2, strength: Double) {
        self.position = position
        self.strength = strength
    }
}

// array of FlowPoints in raw tuple format (GenStreamLine...) [ease of use]
extension Array where Element: FlowPoint {
    func toTuples() -> [(Double, Double, Double)] {
        map { $0.toTuple }
    }
}
