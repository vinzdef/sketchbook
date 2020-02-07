import { Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl'
import BaseSketch from '~/components/base-sketch'

import vert from '~/sketches/cube/cube.vert'
import frag from '~/sketches/cube/cube.frag'

export default class Cube extends BaseSketch {
  init() {
    this.renderer = new Renderer()
    const gl = this.renderer.gl
    this.attach(gl.canvas)

    this.camera = new Camera(gl)
    this.camera.position.z = 5

    this.scene = new Transform()

    const geometry = new Box(gl)

    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
    })

    this.mesh = new Mesh(gl, { geometry, program })
    this.mesh.setParent(this.scene)
  }

  draw() {
    const {mesh, scene, camera} = this
    mesh.rotation.y -= 0.04
    mesh.rotation.x += 0.03
    this.renderer.render({ scene, camera })
  }
}
