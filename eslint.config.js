const nextCoreWebVitals = require('eslint-config-next/core-web-vitals')
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended')
const simpleImportSort = require('eslint-plugin-simple-import-sort')

module.exports = [
  ...nextCoreWebVitals,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'semi-style': ['error', 'last'],
      quotes: ['error', 'single'],
      'react-hooks/set-state-in-effect': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  eslintPluginPrettierRecommended,
]
