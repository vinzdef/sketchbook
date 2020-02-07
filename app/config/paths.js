const root = '.'
const dist = `${root}/dist`
const pub = `${dist}/public`
const artifacts = `${dist}/artifacts`

module.exports = {
  root,
  src: {
    styles: `${root}/styles`,
    static: `${root}/static`,
    scripts: `${root}/scripts`,
    assets: {
      original: `${root}/assets/original`,
      optimized: `${root}/assets/optimized`,
    },
    fixtures: `${root}/fixtures`,
    locales: `${root}/locales`,
    views: `${root}/views`,
  },

  dist: {
    root: dist,
    public: pub,
    artifacts: artifacts,
    releases: `${artifacts}/releases`,
    styles: `${pub}/css`,
    scripts: `${pub}/js`,
    static: `${pub}/static`,
    assets: `${pub}/assets`,
    locales: `${artifacts}/locales`,
    manifest: `${artifacts}/rev-manifest.json`
  }
}
