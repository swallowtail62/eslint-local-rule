const rulesDirPlugin = require('eslint-plugin-rulesdir');
rulesDirPlugin.RULES_DIR = 'eslint/rules';

module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  plugins: ['rulesdir'],
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'rulesdir/ban-variable-name': ['error', { words: [ 'hoge', 'fuga' ] }]
  }
};
