module.exports = {
  'presets': [
    ['@babel/preset-env',
      {
        'debug': process.env.NODE_ENV === 'development',
        'useBuiltIns': 'usage',
        'corejs': 3
      }]
  ],
  'plugins': [
    [
      '@babel/plugin-proposal-decorators', {
        legacy: true
      }
    ],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-syntax-dynamic-import'
  ]
}
