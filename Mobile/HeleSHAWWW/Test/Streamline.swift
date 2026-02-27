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
-> [(Float64, Float64)] { // return
    let current = start;
    var streamLine: [(Float64, Float64)] = [];
    streamLine.append(current);
    // loop until the streamline has gone out of our window start.0 (the starting X) - end
    while (current.0 < end) {
        break; // remove once code has been implemented
        var xVelocity: Float64 = stream.0;
        var yVelocity: Float64 = stream.1;
        for source in sources {
            
        }
        for sink in sinks {
            
        }
    }
    return streamLine;
}
