module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier', 'prettier/react'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'prettier/react'],
  rules: {
    'prettier/prettier': 'error',
    'jsx-quotes': ['error', 'prefer-single'],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', 'ignorePackages', { ts: 'never' }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    camelcase: ['off'],
  },
}
