module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:import/typescript',
  ],
  plugins: [
    'react',
    'prettier',
    'import',
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    }
  },
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'react/prop-types': 'off',
    'react/prefer-stateless-function': 'off',
    'react/jsx-filename-extension': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/no-noninteractive-tabindex': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/named': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': 'off',
    'no-shadow': ['error', {
      'allow': ['_'],
    }],
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unused-vars': ['error', {
      'argsIgnorePattern': '^draft$|^_',
      'ignoreRestSiblings': true,
    }],
    'jsx-a11y/anchor-has-content': 'off',
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "aspects": [ "noHref" ]
    }],
  },
}
