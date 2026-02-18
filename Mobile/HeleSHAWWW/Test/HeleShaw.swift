//
//  HeleShaw.swift
//  Test
//
//  Created by Oscar Langarica on 2/13/26.
//

import UIKit

final class HeleShawGrid:UIView{
    var startX: CGFloat = 20
    var startY: CGFloat = 20
    var cols: Int = 10
    var rows: Int = 6
    var gapX: CGFloat = 30
    var gapY: CGFloat = 30
    var radius:CGFloat = 6
    
    override func awakeFromNib() {
        super.awakeFromNib()
        backgroundColor = .black
        isOpaque = false
        
        layer.borderWidth = 3
        layer.borderColor = UIColor.black.cgColor
    }
    
    override func draw(_ rect: CGRect){
        guard let ctx = UIGraphicsGetCurrentContext() else {return}
        
        ctx.setFillColor(UIColor.white.cgColor)
        
        for row in 0..<rows{
            for col in 0..<cols{
                let x = startX + CGFloat(col) * gapX
                let y = startY + CGFloat(row) * gapY
                let r = radius
                
                let circleRect = CGRect(x: x - r, y: y - r, width: 2*r, height: 2*r)
                ctx.fillEllipse(in: circleRect)
            }
        }
        
    }
}
