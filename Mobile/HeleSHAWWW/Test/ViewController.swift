//
//  ViewController.swift
//  Test
//
//  Created by Oscar Langarica on 2/1/26.
//

enum PlaceMode {
    case none
    case sink
    case source
}


import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var gridView: HeleShawGrid!
    @IBOutlet weak var sourceButton: UIButton!
    @IBOutlet weak var sinkButton: UIButton!
    @IBOutlet weak var playpauseButton: UIButton!
    @IBOutlet weak var clearButton: UIButton!
    
    var isPaused = true
    var placeMode: PlaceMode = .none
    @IBOutlet weak var slider: UISlider!
    @IBOutlet weak var ValueLable: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        gridView.cols = 12
        gridView.rows = 8
        gridView.radius = 5
        gridView.setNeedsDisplay()
        
        let tapGesture = UITapGestureRecognizer(target: self, action: #selector(gridPress(_:)))
        gridView.addGestureRecognizer(tapGesture)
        gridView.isUserInteractionEnabled = true
    }
    
    
    @IBAction func sourceButtonPressed(_ sender: Any) {
        print("source PRESSED")
        placeMode = .source
    }
    
    @IBAction func playButtonPressed(_ sender: UIButton){
        isPaused.toggle()
        if isPaused {
            sender.setTitle("Play", for:.normal)
        }
        else {
            sender.setTitle("Pause", for:.normal)
        }
        gridView.isPaused = isPaused
        gridView.setNeedsDisplay()
    }
    
    @IBAction func sinkButtonPressed(_ sender: Any) {
        print("sink pressed")
        placeMode = .sink
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
    
    @IBAction func clearButtonPressed(_ sender: Any) {
        print("clear pressed")
        gridView.sources.removeAll()
        gridView.sinks.removeAll()
        gridView.setNeedsDisplay()
    }

    
    @objc func gridPress(_ gesture: UITapGestureRecognizer) {
        let point = gesture.location(in: gridView)
        let x_space = gridView.bounds.width / CGFloat(gridView.cols + 1)
        let y_space = gridView.bounds.height / CGFloat(gridView.rows + 1)
        let col = Int(round(point.x / x_space)) - 1
        let row = Int(round(point.y / y_space)) - 1
        if(row < 0 || row >= gridView.rows || col < 0 || col >= gridView.cols){
            return
        }
        
        let place = gridView.gridPoint(col: col, row: row)
        let x = place.0
        let y = place.1
        
        //let x = Float64(point.x)
       // let y = Float64(point.y)
        if(placeMode == .sink){
            gridView.sinks.append((x,y, 6.0))
        }
        else if(placeMode == .source){
            gridView.sources.append((x,y, 6.0))
        }
        gridView.setNeedsDisplay()
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
