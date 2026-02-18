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


}

