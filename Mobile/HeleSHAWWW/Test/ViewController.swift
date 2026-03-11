//
//  ViewController.swift
//  Test
//
//  Created by Oscar Langarica on 2/1/26.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var gridView: HeleShawGrid!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        gridView.cols = 12
        gridView.rows = 8
        gridView.radius = 5
        gridView.setNeedsDisplay()
    
        
    }

    @IBAction func RemoveLater(_ sender: Any) {
        let sinks: [(Float64, Float64, Float64)] = [(2.0, 4.0, 2.0), (4.0, 5.0, 1.0)];
        let sources: [(Float64, Float64, Float64)] = [(1.0,2.0,1.0), (4.0, 3.0, 2.0)];
        let stream: (Float64, Float64) = (3.0, 0.0);
        let start: (Float64, Float64) = (0.0, 3.0);
        let end: Float64 = 10.0;
        let step: Float64 = 0.1;
        let streamline = GenStreamLine(sources: sources, sinks: sinks, stream: stream, start: start, end: end, step: step)
        for point in streamline {
            print("\(point.0), \(point.1)");
        }
    }
    
}

