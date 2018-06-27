module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-unused-vars': [
      'error',
      { varsIgnorePattern: 'React', argsIgnorePattern: '^_' },
    ],
    'react/jsx-uses-vars': ['error'],
    'prettier/prettier': 'error',
  },
};

