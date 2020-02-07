import Application from '~/components/application'

function start() {
  window.sketchbook = {
    application: new Application(),
  }
}

document.fonts
  ? document.fonts.ready.then(start)
  : start()


