const gulp = require('gulp')
const plugins = require('./utils/gulp-plugins')
const Golc = require('golc')
const L = new Golc('client | views', {withNewline: true})

const fs = require('fs')
const path = require('path')
const glob = require('globby')
const camelCase = require('lodash.camelcase')

const paths = require('../config/paths')
const nunjucks = require('nunjucks')

const fixturesPath = paths.src.fixtures
const sketchesPath = paths.src.sketches
const manifestPath = paths.dist.manifest
const viewPath = paths.src.views
const distPath = paths.dist.public

const options = require('../config/options')

const viewPaths = [
  `${viewPath}/{,*/}*.{njk,html}`,
  `!${viewPath}/templates/**`,
  `!${viewPath}/macro/**`,
  `!${viewPath}/partials/**`,
  `!${viewPath}/components/**`,
  `!${viewPath}/sections/**`,
]

function errorNotifier(error) {
  if (!error) return
  L.error(error)
}

function compileNunjucks(templateData) {
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(viewPath))

  return gulp.src(viewPaths)
    .pipe(plugins.if(!options.isProduction, plugins.plumber({errorHandler: errorNotifier})))
    .pipe(plugins.nunjucks.compile(templateData, {
      env: env
    }))
    .pipe(plugins.rename({
      extname: '.html',
    }))
    .pipe(plugins.if(options.minifyHTML, plugins.htmlmin({
      collapseWhitespace: true,
      removeComments: true
    })))
    .pipe(gulp.dest(distPath))
}

function getTemplateData() {
  const templateData = glob.sync('{,*/}*.json', { cwd: fixturesPath }).reduce((obj, filename) => {
    const id = camelCase(filename.toLowerCase().replace('.json', ''))
    obj[id] = JSON.parse(fs.readFileSync(path.join(fixturesPath, filename), { encoding: 'utf8' }))
    return obj
  }, {})

  templateData.isProduction = options.isProduction
  templateData.revisions = {}

  if (options.isProduction) {
    if (fs.existsSync(manifestPath)) {
      templateData.revisions = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
    }

    const criticalJsPath = templateData.revisions['js/critical.js'] || 'js/critical.js'
    const criticalCssPath = templateData.revisions['css/critical.css'] || 'css/critical.css'

    templateData.criticalScript = fs.readFileSync(`${paths.dist.public}/${criticalJsPath}`, 'utf8')
    templateData.criticalCss = fs.readFileSync(`${paths.dist.public}/${criticalCssPath}`, 'utf8')
  }

  return templateData
}

module.exports = function views() {
  const templateData = getTemplateData()
  templateData.build = {
    timestamp: Date.now()
  }

  templateData.sketches = fs.readdirSync(sketchesPath)
  L.info(`SKETCHES: \n ∙ ${templateData.sketches.join('\n')}`)
  return compileNunjucks(templateData)
}

