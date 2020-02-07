import Component from '@okiba/component'
import {qs, on} from '@okiba/dom'

import Sidebar from '~/components/sidebar'

const ui = {
  mainpane: '.js-mainpane',
}

const components = {
  sidebar: {selector: '.js-sidebar', type: Sidebar}
}
export default class Application extends Component {
  constructor() {
    super({ el: qs('.js-application'), ui, components })

    on(window, 'hashchange', this.onHashChange)
    this.components.sidebar.on('toggle', this.onSidebarToggle)
    this.components.sidebar.on('click:restart', this.onRestartClick)
    this.changeSketch()
  }

  changeSketch() {
    if (location.hash) {
      this.sketchName = location.hash.replace('#', '')
      this.loadSketch()
      this.components.sidebar.enableButtons(this.sketchName)
    } else {
      this.sketchName = null
      this.ui.mainpane.setAttribute('data-state', 'empty')
      this.destroySketch()
      this.components.sidebar.disableButtons()
    }
  }

  async loadSketch() {
    this.ui.mainpane.setAttribute('data-state', 'loading')

    this.destroySketch()

    const { default: Sketch } = await import(
      `~/sketches/${this.sketchName}/${this.sketchName}`
    )

    this.SketchClass = Sketch
    this.initSketch()

    this.ui.mainpane.setAttribute('data-state', 'ready')
  }

  initSketch() {
    this.sketch = new this.SketchClass({ el: this.ui.mainpane })
  }

  restartSketch() {
    this.destroySketch()
    this.initSketch()
  }

  destroySketch() {
    if (this.sketch) {
      this.sketch.destroy()
      this.sketch = null
    }
  }

  onRestartClick = () => {
    this.restartSketch()
  }

  onSidebarToggle = () => {
    this.sketch && this.sketch.onResize()
  }

  onHashChange = () => {
    this.changeSketch()
  }
}
