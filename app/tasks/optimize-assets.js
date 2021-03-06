const fetch = require('node-fetch')
const fs = require('fs')

const Golc = require('golc')
const L = new Golc('client | optimize-asets')

const options = require('../config/options')
const paths = require('../config/paths')

module.exports = function optimizeAssets() {
  return new Promise((res, rej) => {
    fetch('http://tommy', {
      method: 'POST',
      body: JSON.stringify(options.tommy),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res).catch(rej)
  })
}


/**

  Tommy default config

  "remoteSync": false,
  "s3Bucket": null,
  "processor.jpg": {
    "enabled": true
  },
  "processor.png": {
    "enabled": true
  },
  "processor.gif": {
    "enabled": true
  },
  "processor.svg": {
    "enabled": true
  },
  "converter.mp4": {
    "enabled": true
  },
  "converter.webm": {
    "enabled": true
  },
  "converter.webp": {
    "enabled": true
  },
  "converter.mp3": {
    "enabled": true
  },
  "converter.ttf": {
    "enabled": true
  },
  "converter.otf": {
    "enabled": true
  },
  "converter.svg": {
    "enabled": true
  },
  "converter.eot": {
    "enabled": true
  },
  "converter.woff": {
    "enabled": true
  },
  "converter.woff2": {
    "enabled": true
  },
  "tester.image": {
    "enabled": true
  },
  "tester.video": {
    "enabled": true
  },
  "tester.font": {
    "enabled": true
  },
  "processor.resize": {
    "enabled": true,
    "suffix": "-resized-${i}.${ext}",
    "dimensions": [200, 400, 800, 1200],
    "quality": 80
  },
  "processor.image": {
    "enabled": true,
    "quality": 80
  },
  "processor.videoThumbs": {
    "enabled": true,
    "suffix": "-thumb-${i}.jpg",
    "size": 400,
    "quality": 80,
    "count": 5
  },
  "processor.poster": {
    "enabled": true,
    "suffix": "-poster.jpg"
  },
  "processor.lazyLoadBlurried": {
    "enabled": true,
    "suffix": "-blurried.jpg",
    "size": 10
  },
  "processor.favicon": {
    "enabled": true,
    "browserconfig": true,
    "test": true,
    "webmanifest": {
      "name": "",
      "short_name": "",
      "theme_color": "#336699",
      "background_color": "#336699",
      "display": "standalone"
    },
    "tileColor": "#336699",
    "themeColor": "#336699"


**/
