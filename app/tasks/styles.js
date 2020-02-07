const gulp = require('gulp')
const plugins = require('./utils/gulp-plugins')
const { gulpSassError } = require('gulp-sass-error')
const fetch = require('node-fetch')
const lazypipe = require('lazypipe')
const path = require('path')
const autoprefixer = require('autoprefixer')
const paths = require('../config/paths')
const Golc = require('golc')
const L = new Golc('client | styles')

const options = require('../config/options')
const { isProduction } = options

function getOptimizePipe() {
  let destPath = paths.dist.styles
  if (isProduction) {
    destPath = path.normalize(destPath.replace(paths.dist.root, '/var/tmp/'))
  }

  return lazypipe()
    .pipe(() => gulp.dest(destPath))
    .pipe(plugins.cleanCss, {
      advanced: false,
      aggressiveMerging: false,
      mediaMerging: false,
      rebase: false
    })()
}

module.exports = function() {
  function errorNotifier(error) {
    L.error(error.messageFormatted)
  }

  const pipeline = gulp.src(`${paths.src.styles}/*.{sass,scss}`)
    .pipe(plugins.if(!isProduction, plugins.plumber({errorHandler: errorNotifier})))
    .pipe(plugins.if(!isProduction, plugins.sourcemaps.init()))
    .pipe(plugins.sass({
      precision: 10,
      outputStyle: 'expanded',
    }).on('error', gulpSassError(isProduction)))
    .pipe(plugins.postcss([
      autoprefixer()
    ]))
    .pipe(plugins.if(isProduction, getOptimizePipe()))
    .pipe(plugins.if(!isProduction, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(paths.dist.styles + '/'))
    .pipe(plugins.size({ title: 'styles' }))

  if (!options.isProduction) {
    pipeline.on('end', _ => {
      fetch('http://browser-sync/__browser_sync__?method=reload&args=%2A%2A%2F%2A.css')
        .then(_ => L.info('Styles refreshed'))
        .catch(_ => L.warn('Can\'t refresh styles -> BrowserSync is not up?'))
    })
  }

  return pipeline
}
