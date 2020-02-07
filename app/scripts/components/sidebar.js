import EventedComponent from '@okiba/evented-component'
import {on} from '@okiba/dom'

const ui = {
  toggle: '.js-side-toggle',
  restart: '.js-restart',
  codeLink: '.js-code-link'
}

export default class Sidebar extends EventedComponent {
  constructor({el}) {
    super({el, ui})

    this.isSidebarOpen = this.el.getAttribute('data-state') === 'open'

    on(this.ui.toggle, 'click', this.onToggleClick)
    on(this.ui.restart, 'click', this.onRestartClick)
  }

  toggle() {
    this.isSidebarOpen = !this.isSidebarOpen
    this.el.setAttribute(
      'data-state',
      this.isSidebarOpen
        ? 'open'
        : 'closed'
    )

    this.emit('toggle')
  }

  enableButtons(sketchName) {
    this.ui.restart.removeAttribute('disabled')
    this.ui.codeLink.href =
      `${this.ui.codeLink.getAttribute('data-base-url')}${sketchName}/`
  }

  disableButtons() {
    this.ui.restart.disabled = true
    this.ui.codeLink.removeAttribute('href')
  }

  onRestartClick = () => {
    this.emit('click:restart')
  }

  onToggleClick = () => {
    this.toggle()
  }
}
