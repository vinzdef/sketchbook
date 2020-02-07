const options = {
  isProduction: process.env.NODE_ENV === 'production',
  buildHash: `buildhash:${Date.now()}`,
  // i18n: {
  //   locales: ['en', 'it'],
  //   defaultLocale: 'en',
  //   updateFiles: false,
  //   syncFiles: false,
  // },
  minifyHTML: true,
  tommy: {
    src: '/src',
    dst: '/dst',
    timeout: null,
    config: {
      'tester.image': {
        enabled: false
      },
      'processor.svg': {
        'enabled': true
      },
      'tester.font': {
        'enabled': false
      },
      'processor.resize': {
        'enabled': false,
        'suffix': '-${i}.${ext}',
        'dimensions': [10, 300],
      },
      'processor.lazyLoadBlurried': {
        'enabled': false
      }
    }
  }
}

module.exports = options
