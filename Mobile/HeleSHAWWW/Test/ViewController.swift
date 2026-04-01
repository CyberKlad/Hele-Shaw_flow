//
//  ViewController.swift
//  Test
//
//  Created by Oscar Langarica on 2/1/26.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var gridView: HeleShawGrid!
    @IBOutlet weak var slider: UISlider!
    @IBOutlet weak var ValueLable: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        gridView.cols = 12
        gridView.rows = 8
        gridView.radius = 5
        gridView.setNeedsDisplay()
        
        let tap = UITapGestureRecognizer(target: self,action: #selector(screenTap))
        gridView.isUserInteractionEnabled = true
        gridView.addGestureRecognizer(tap)
        
        slider.minimumValue = 0
        slider.maximumValue = 100
        
        slider.addTarget(self, action: #selector(sliderChange(_:)), for: .valueChanged)
        slider.addTarget(self, action: #selector(sliderChange(_:)), for: .valueChanged)
        
        
    }
    
    
    @objc func screenTap() {
        gridView.backgroundColor = randomColor() //Change later this is for testing 
        
        }
    
    @objc func sliderChange(_ sender: UISlider){
        ValueLable.text="\(Int (sender.value))%"
    }
        func randomColor() -> UIColor{
            return UIColor(
           red:CGFloat.random(in: 0...1),
            green:CGFloat.random(in: 0...1),
            blue:CGFloat.random(in: 0...1),
            alpha: 1.0
            )
            
    }
    
    
    @IBAction func RemoveLater(_ sender: Any) {
        let sinks: [(Float64, Float64, Float64)] = [];
        let sources: [(Float64, Float64, Float64)] = [(2.0, 4.0, -2.0), (4.0, 5.0, -1.0), (1.0,2.0,1.0), (4.0, 3.0, 2.0)];
        let stream: (Float64, Float64) = (3.0, 0.0);
        let start: (Float64, Float64) = (0.0, 3.0);
        let end: Float64 = 10.0;
        let step: Float64 = 0.01;
        let streamline = GenStreamLine(sources: sources, sinks: sinks, stream: stream, start: start, end: end, step: step)
        for point in streamline {
            print("\(point.0), \(point.1)");
        }
    }
    
}
