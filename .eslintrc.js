// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
rules: {
  'indent': 0,
  'key-spacing': 0,
  'space-before-blocks': 0,
  'no-multiple-empty-lines': 0,
  'no-tabs': 0,
  'no-trailing-spaces': 0,
  'padded-blocks': 0,
  'comma-dangle': 0
}
}
