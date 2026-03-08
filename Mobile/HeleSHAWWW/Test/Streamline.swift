//
//  Streamline.swift
//  Test
//
//  Created by Korbin Gillette on 2/25/26.
//

import SwiftUI

func GenStreamLine(sources: [(Float64, Float64, Float64)], // [(X, Y, Strength)]
                   sinks: [(Float64, Float64, Float64)], // [(X, Y, Strength)]
                   stream: (Float64, Float64), // the vector defining default stream
                   start: (Float64, Float64), // starting point
                   end: Float64, // the X value we want to stop at
                   step: Float64) // effectively the resolution
-> [(Float64, Float64)] { // return type
    
    // set strength to 1 will be changed for each source and sink
    var strength : Float64 = 1;
    
    // make pi a variable for easier typing
    let pi: Float64 = Float64.pi;
    
    // set up cursor for current point
    var current: (Float64, Float64) = start;
    
    // load starting point into streamline
    var streamLine: [(Float64, Float64)] = [];
    streamLine.append(current);
    
    // loop until the streamline has gone out of our window start.0 (the starting X) - end
    while (current.0 < end) {
        // set initial velocities to the stream provided
        var xVelocity: Float64 = stream.0;
        var yVelocity: Float64 = stream.1;
        
        // loop through sources adding their value to the velocity
        for source in sources {
            strength = source.2;
            let xDistance: Float64 = current.0 - source.0;
            let yDistance: Float64 = current.1 - source.1;
            xVelocity += ( strength * xDistance ) / ( 2 * pi * ( pow(xDistance, 2) + pow(yDistance, 2)));
            yVelocity += ( strength * yDistance ) / ( 2 * pi * ( pow(xDistance, 2) + pow(yDistance, 2)));
        }
        
        // loop through sinks subtracting their value from the velocity
        for sink in sinks {
            strength = sink.2;
            let xDistance: Float64 = current.0 - sink.0;
            let yDistance: Float64 = current.1 - sink.1;
            xVelocity -= ( strength * xDistance ) / ( 2 * pi * ( pow(xDistance, 2) + pow(yDistance, 2)));
            yVelocity -= ( strength * yDistance ) / ( 2 * pi * ( pow(xDistance, 2) + pow(yDistance, 2)));
        }
        // make xVelocity equal step and scale yVelocity by the same
        yVelocity /= (xVelocity * step);
        
        // new Y is now just current Y + yVelocity
        let newY: Float64 = current.1 + yVelocity;
        let newX: Float64 = current.0 + step;
        let newPoint: (Float64, Float64) = (newX, newY);
        
        // add new point to streamline change cursor and repeat
        streamLine.append(newPoint);
        current = newPoint;
    }
    return streamLine;
}
