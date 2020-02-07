const gulp = require('gulp')
const paths = require('../config/paths')

module.exports = function watch() {
  return new Promise(resolve => {
    gulp.watch(`${paths.src.styles}/**/*.{sass,scss}`,
      gulp.series('styles')
    )

    gulp.watch(`${paths.src.scripts}/independent/**/*.js`,
      gulp.series('webpack-independent', 'reload-browser')
    )

    gulp.watch(`${paths.src.scripts}/**/*.js`,
      gulp.series('views', 'reload-browser')
    )

    gulp.watch(`${paths.src.assets.original}/**/*.*`,
      gulp.series('optimize-assets', 'reload-browser')
    )

    gulp.watch(`${paths.src.static}/**/*.*`,
      gulp.series('copy-static')
    )

    gulp.watch(`${paths.src.views}/**/*.{njk,html}`,
      gulp.series('views', 'reload-browser')
    )

    gulp.watch(`${paths.src.fixtures}/**/*.json`,
      gulp.series('views', 'reload-browser')
    )

    resolve()
  })
}
