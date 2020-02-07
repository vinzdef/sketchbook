import { Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl';
import {qs} from '@okiba/dom'

import vert from '~/sketches/cube/cube.vert'
import frag from '~/sketches/cube/cube.frag'

export default function run() {
  const mainpane = qs('.js-mainpane')

  const renderer = new Renderer();
  const gl = renderer.gl;
  mainpane.innerHTML = ''
  mainpane.appendChild(gl.canvas);

  const camera = new Camera(gl);
  camera.position.z = 5;

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.perspective({
      aspect: gl.canvas.width / gl.canvas.height,
    });
  }
  window.addEventListener('resize', resize, false);
  resize();

  const scene = new Transform();

  const geometry = new Box(gl);

  const program = new Program(gl, {
    vertex: vert,
    fragment: frag,
  });

  const mesh = new Mesh(gl, { geometry, program });
  mesh.setParent(scene);

  requestAnimationFrame(update);
  function update(t) {
    requestAnimationFrame(update);

    mesh.rotation.y -= 0.04;
    mesh.rotation.x += 0.03;
    renderer.render({ scene, camera });
  }
}
