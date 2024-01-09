module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    // 'airbnb',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "global-require": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/no-absolute-path": 0,
    "no-console": 0,
    "import/prefer-default-export": 0,
    "react/jsx-props-no-spreading": 0,
    "jsx-a11y/anchor-is-valid": 0,
    quotes: 0,
    "comma-dangle": 0,
    "no-param-reassign": 0,
    "no-case-declarations": 0,
    "jsx-a11y/no-static-element-interactions": 0,
  },
};
