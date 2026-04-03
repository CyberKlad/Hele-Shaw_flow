//  HeleShaw.swift
//  Test
//
//  Created by Oscar Langarica on 2/13/26.
//

import UIKit

class HeleShawGrid: UIView {

    //number of columns and rows for background, radius is the radius of background grey circles
    var cols: Int = 10
    var rows: Int = 10
    var radius: CGFloat = 5

    var isPaused: Bool = true
    var sources: [(Float64, Float64, Float64)] = []
    var sinks: [(Float64, Float64, Float64)] = []
    
    //used to draw the grid and streamlines
    override func draw(_ rect: CGRect) {
        super.draw(rect)

        let context = UIGraphicsGetCurrentContext()
        if context == nil {
            return
        }

        drawBackgroundGrid(context: context!)
        drawPoints(context: context!)
        if !isPaused {
            drawStreamlines()
        }
    }
    
    // this redraws when screen is rotated so that distortion doesnt happen
    override var bounds: CGRect {
        didSet {
            setNeedsDisplay();
        }
    }

    //draw grey background circles
    func drawBackgroundGrid(context: CGContext) {
        let spacingX = bounds.width / CGFloat(cols + 1)
        let spacingY = bounds.height / CGFloat(rows + 1)

        UIColor.gray.setFill()

        for row in 0..<rows {
            for col in 0..<cols {
                let x = spacingX * CGFloat(col + 1)
                let y = spacingY * CGFloat(row + 1)

                let circleRect = CGRect(x: x - radius,
                                        y: y - radius,
                                        width: radius * 2,
                                        height: radius * 2)

                context.fillEllipse(in: circleRect)
            }
        }
    }
    
    func drawPoints(context: CGContext){
        UIColor.blue.setFill()
        for source in sources {
            let x = CGFloat(source.0)
            let y = CGFloat(source.1)
            let circlePoint = CGRect(x: x - radius, y: y - radius, width: radius*2, height: radius*2)
            context.fillEllipse(in: circlePoint)
        }
        UIColor.red.setFill()
        for sink in sinks {
            let x  = CGFloat(sink.0)
            let y = CGFloat(sink.1)
            let circlePoint = CGRect(x: x - radius, y: y - radius, width: radius*2, height: radius*2)
            context.fillEllipse(in: circlePoint)
        }
    }
//function used to draw sources and sinks only on grid points, not sure if we need that or not
    func gridPoint(col: Int, row: Int) -> (Float64, Float64) {
        let spacingX = bounds.width / CGFloat(cols + 1)
        let spacingY = bounds.height / CGFloat(rows + 1)

        let x = spacingX * CGFloat(col + 1)
        let y = spacingY * CGFloat(row + 1)

        return (Float64(x), Float64(y))
    }

    //calls korbin's function to draw the streamlines. I have some random sources and sinks for now.
    func drawStreamlines() {
        // never used?
        // let spacingX = bounds.width / CGFloat(cols + 1)
        let spacingY = bounds.height / CGFloat(rows + 1)

        let leftX = 0.0
        let rightX = bounds.width
        let topY = Float64(spacingY)
/*
        let sinks: [(Float64, Float64, Float64)] = []

        let x1 = Float64(spacingX * 3)
        let y1 = Float64(spacingY * 4)

        let x2 = Float64(spacingX * 5)
        let y2 = Float64(spacingY * 5)

        let x3 = Float64(spacingX * 8)
        let y3 = Float64(spacingY * 3)

        let x4 = Float64(spacingX * 10)
        let y4 = Float64(spacingY * 4)

        let sources: [(Float64, Float64, Float64)] = [
            (x1, y1, 6.0),
            (x2, y2, -7.0),
            (x3, y3, 8.0),
            (x4, y4, 5.0)
        ]
*/
        //the 0.2 is the strength of the flow. Higher numbers mean less impact from sources and sinks and straighter lines
        let stream: (Float64, Float64) = (0.2, 0.0)
        let end: Float64 = rightX
        let step: Float64 = 0.1

        let numberOfLines = rows

        for i in 0..<numberOfLines {
            let startY = topY + (Float64(i) * Float64(spacingY))
            let start: (Float64, Float64) = (leftX, startY)

            let points = GenStreamLine(
                sources: sources,
                sinks: sinks,
                stream: stream,
                start: start,
                end: end,
                step: step
            )

            drawOneStreamline(points: points)
        }
    }

    //connects all the points with a line
    func drawOneStreamline(points: [(Float64, Float64)]) {
        if points.count == 0 {
            return
        }

        let path = UIBezierPath()
        path.lineWidth = 2.0

        let firstX = points[0].0
        let firstY = points[0].1

        path.move(to: CGPoint(x: firstX, y: firstY))

        for i in 1..<points.count {
            let x = points[i].0
            let y = points[i].1
            let nextPoint = CGPoint(x: x, y: y)
            path.addLine(to: nextPoint)
        }

        UIColor.blue.setStroke()
        path.stroke()
    }
}
