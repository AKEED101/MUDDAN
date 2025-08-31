module.exports = {
  root: true,
  extends: [
    'eslint:recommended'
  ],
  env: {
    node: true,
    es6: true,
    browser: true,
    es2020: true,
    'react-native/react-native': true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'react-native'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-case-declarations': 'off'
  }
};
