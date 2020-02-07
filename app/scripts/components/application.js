import Component from '@okiba/component'
import {qs} from '@okiba/dom'

export default class Application extends Component {
  constructor() {
    super({ el: qs('.js-application') })
  }
}
