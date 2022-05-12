module.exports = {
  "root": true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb",
    "prettier"
  ],
  "rules": {
    "import/extensions": 0,
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": 0,
    "import/prefer-default-export": 0,
    "no-console": [2, { "allow": ["info", "warn", "error"] }],
    "no-underscore-dangle": 0,
    "no-use-before-define": [2, "nofunc"],
    "object-property-newline": [2, { "allowAllPropertiesOnSameLine": true }],
    "semi": [2, "always"],
    "react/jsx-uses-react": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".jsx"] }],
    "react/no-unescaped-entities": 0,
    "react/react-in-jsx-scope": 0,
    "react/require-default-props": 0,
    "react/self-closing-comp": 2,
    "react/prop-types": 0,
  }
}