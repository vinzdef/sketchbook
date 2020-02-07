window.scrollTo(0, 0)
window.onunload = _ => window.scrollTo(0, 0)
history && (history.scrollRestoration = 'manual')

function init() {
  const appScript = document.querySelector('script[data-src]')
  appScript.setAttribute('src', appScript.dataset.src)
}

window.addEventListener('DOMContentLoaded', init)
document.documentElement.classList.remove('no-js')

