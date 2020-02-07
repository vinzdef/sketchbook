const fetch = require('node-fetch')

module.exports = function reloadBrowserSync() {
  return fetch('http://browser-sync/__browser_sync__?method=reload')
}
