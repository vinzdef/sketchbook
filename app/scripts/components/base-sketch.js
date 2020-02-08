import Component from '@okiba/component'
import EventManager from '@okiba/event-manager'
import SizesCache from '@okiba/sizes-cache'

export default class BaseSketch extends Component {
  constructor({ el }) {
    super({ el })
    this.sizes = SizesCache.get(this.el)
    this.start()
  }

  async start() {
    this.init()
    this.onResize()
    await this.prepare()
    EventManager.on('raf', this.onRaf)
    EventManager.on('resize', this.onResize)
  }

  onRaf = () => {
    this.draw()
  }

  attach(canvas) {
    this.el.appendChild(canvas)
    this.canvas = canvas
  }

  detach() {
    this.el.removeChild(this.canvas)
  }

  onResize = () => {
    SizesCache.onResize()

    this.canvas.width = this.sizes.width
    this.canvas.height = this.sizes.height
    this.renderer && this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.camera && this.camera.perspective({
      aspect: this.sizes.width / this.sizes.height,
    })
  }

  onDestroy() {
    this.cleanup()
    EventManager.off('raf', this.onRaf)
    EventManager.off('resize', this.onResize)
    this.detach()
  }
}
