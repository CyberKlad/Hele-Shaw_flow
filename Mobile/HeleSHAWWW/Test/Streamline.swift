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
    
    // damper will be used to tweak the effectiveness of the strength
    let damper : Float64 = 1.0;
    
    // make pi a variable for easier typing
    let pi: Float64 = Float64.pi;
    
    // set up cursor for current point
    var current: (Float64, Float64) = start;
    
    // load starting point into streamline
    var streamLine: [(Float64, Float64)] = [];
    streamLine.append(current);
    
    // variables for tracking issue and limiting run time
    var probDetect: Bool = false;
    var stepLim = 2 * end / step;
    
    // loop until the streamline has gone out of our window start.0 (the starting X) - end
    while (current.0 < end && stepLim > 0) {
        stepLim -= 1;
        
        // set initial velocities to the stream provided
        var xVelocity: Float64 = stream.0;
        var yVelocity: Float64 = stream.1;
        //print("Initial V in the x and y dir: \(xVelocity), \(yVelocity)");
        
        // loop through sources adding their value to the velocity
        for source in sources {
            strength = source.2 / damper;
            let xDistance: Float64 = current.0 - source.0;
            let yDistance: Float64 = current.1 - source.1;
            xVelocity += ( strength * xDistance ) / ( 2 * pi * ( pow(xDistance, 2) + pow(yDistance, 2)));
            yVelocity += ( strength * yDistance ) / ( 2 * pi * ( pow(xDistance, 2) + pow(yDistance, 2)));
            //print("V in the x and y dir after source \(source.0), \(source.1): \(xVelocity), \(yVelocity)");
            
            // check for divide by zero
            if (yVelocity.isNaN || xVelocity.isNaN) {
                print("Error: NaN detected during source \(source.0), \(source.1) while at \(current.0), \(current.1)");
                probDetect = true;
                break;
            }
            
            // check for overflow
            if (xVelocity.isInfinite || yVelocity.isInfinite) {
                print("Error: Inf detected during source \(source.0), \(source.1) while at \(current.0), \(current.1)");
                probDetect = true;
                break;
            }
        }
        
        // loop through sinks subtracting their value from the velocity
        for sink in sinks {
            strength = sink.2 / damper;
            let xDistance: Float64 = current.0 - sink.0;
            let yDistance: Float64 = current.1 - sink.1;
            xVelocity -= ( strength * xDistance ) / ( 2 * pi * ( pow(xDistance, 2) + pow(yDistance, 2)));
            yVelocity -= ( strength * yDistance ) / ( 2 * pi * ( pow(xDistance, 2) + pow(yDistance, 2)));
            //print("V in the x and y dir after sink \(sink.0), \(sink.1): \(xVelocity), \(yVelocity)");
            
            // check for divide by zero
            if (yVelocity.isNaN || xVelocity.isNaN) {
                print("Error: NaN detected during sink \(sink.0), \(sink.1) while at \(current.0), \(current.1)");
                probDetect = true;
                break;
            }
            
            // check for overflow
            if (xVelocity.isInfinite || yVelocity.isInfinite) {
                print("Error: Inf detected during sink \(sink.0), \(sink.1) while at \(current.0), \(current.1)");
                probDetect = true;
                break;
            }
        }
        
        // shrink hypotenuse to step size
        let vHypotenuse: Float64 = sqrt(pow(xVelocity, 2) + pow(yVelocity, 2)) / step;
        
        if (vHypotenuse.isInfinite) {
            print("Error: Inf detected in hypotenuse while at \(current.0), \(current.1)");
            probDetect = true;
        }
        
        // shrink x and y by that same ratio
        yVelocity /= vHypotenuse;
        xVelocity /= vHypotenuse;
        
        // check for divide by zero
        if (yVelocity.isNaN || xVelocity.isNaN || probDetect) {
            print("Error: NaN detected in velocity while at \(current.0), \(current.1)");
            xVelocity = step;
            yVelocity = 0;
        }
        
        // create new point
        let newY: Float64 = current.1 + yVelocity;
        let newX: Float64 = current.0 + xVelocity;
        let newPoint: (Float64, Float64) = (newX, newY);
        
        // add new point to streamline change cursor and repeat
        streamLine.append(newPoint);
        current = newPoint;
        
        if (streamLine.count % 10 == 9){
            // compare current point and point 9 points back
            // if these 2 points have not moved far enough away from each other
            // stop streamline
            if (abs(current.0 - streamLine[streamLine.count - 9].0) < step &&
                abs(current.1 - streamLine[streamLine.count - 9].1) < step) {
                break;
            }
        }
    }
    return streamLine;
}
