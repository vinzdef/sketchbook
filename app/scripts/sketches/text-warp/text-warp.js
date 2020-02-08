/**
 * This class is "heavily inspired" (as one says nowdays
 * when they don't want to admit they copied) from:
 * https://github.com/oframe/ogl/blob/master/examples/msdf-text.html.
 */
import { Renderer, Camera, Transform, Geometry, Texture, Program, Mesh, Orbit, Text } from 'ogl'
import BaseSketch from '~/components/base-sketch'

import {loadImage, loadJson} from '~/utils/load'

import vert from '~/sketches/text-warp/text-warp.vert'
import frag from '~/sketches/text-warp/text-warp.frag'

export default class TextWarp extends BaseSketch {
  init() {
    this.renderer = new Renderer({dpr: devicePixelRatio})
    this.gl = this.renderer.gl
    this.attach(this.gl.canvas)

    this.gl.clearColor(1, 1, 1, 1)

    this.camera = new Camera(this.gl, { fov: 45 })
    this.camera.position.set(0, 0, 7)

    this.controls = new Orbit(this.camera)

    this.scene = new Transform()

    this.texture = new Texture(this.gl, {
      generateMipmaps: false
    })


    this.program = new Program(this.gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        tMap: { value: this.texture }
      },
      transparent: true,
      cullFace: null,
      depthWrite: false
    })
  }

  async prepare() {
    const img = await loadImage('/assets/msdf/special-elite.png')
    this.texture.image = img

    const font = await loadJson('/assets/msdf/special-elite.json')

    this.text = new Text({
      font,
      text: 'Never follow',
      width: 4,
      align: 'center',
      letterSpacing: -0.05,
      size: 1,
      lineHeight: 1.4
    })

    const geometry = new Geometry(this.gl, {
      position: { size: 3, data: this.text.buffers.position },
      uv: { size: 2, data: this.text.buffers.uv },
      id: { size: 1, data: this.text.buffers.id },
      index: { data: this.text.buffers.index },
    })

    this.mesh = new Mesh(this.gl, { geometry, program: this.program })
    this.mesh.position.y = this.text.height * 0.5
    this.mesh.setParent(this.scene)
  }

  draw() {
    const {mesh, scene, camera} = this
    this.controls.update()
    this.renderer.render({ scene, camera })
  }

  cleanup() {
    debugger
  }
}
