//
//  DisplayRenderer.swift
//  Test
//
//  Created by Oscar Langarica on 2/1/26.
//

import GLKit
import OpenGLES

final class DisplayRenderer: NSObject, GLKViewDelegate {
    
    private let state: SharedState
    
    init(state: SharedState) {
        self.state = state
        super.init()
    }
    
    func glkView(_ view: GLKView, drawIn rect: CGRect) {
        
    }
    
}
