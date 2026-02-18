//
//  OpenGL.swift
//  Test
//
//  Created by Oscar Langarica on 2/1/26.
//

import UIKit
import GLKit
import OpenGLES

final class OpenGL: UIViewController {
    @IBOutlet private weak var displayView: GLKView!

    private let state = SharedState()

    private lazy var displayRenderer  = DisplayRenderer(state: state)

    override func viewDidLoad() {
        super.viewDidLoad()


        displayView.delegate  = displayRenderer

        let link = CADisplayLink(target: self, selector: #selector(redraw))
        link.add(to: .main, forMode: .default)
    }

    @objc private func redraw() {
        displayView.display()
    }
}


