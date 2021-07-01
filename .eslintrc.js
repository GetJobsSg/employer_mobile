module.exports = {
  root: true,
  extends: ['@react-native-community', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  parserOptions: {
    createDefaultProgram: true,
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: { es6: true },
  rules: {
    'import/prefer-default-export': 'off',
    'global-require': 'off',
    'react-native/no-inline-styles': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-param-reassign': 'off',
    'react/no-array-index-key': 'warn',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
