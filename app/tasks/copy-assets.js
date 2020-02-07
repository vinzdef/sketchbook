const paths = require('../config/paths')
const gulp = require('gulp')

module.exports = function copyAssets() {
  return gulp.src(`${paths.src.assets.optimized}/**/*`)
    .pipe(gulp.dest(`${paths.dist.assets}/`))
}
