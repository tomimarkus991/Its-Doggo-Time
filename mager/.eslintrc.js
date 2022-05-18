module.exports = {
  root: true,
  env: { browser: true, es2021: true, es6: true, jest: true },
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 13, sourceType: "module" },
  settings: { react: { version: "detect" }, "import/resolver": { typescript: {} } },
  plugins: ["react", "react-hooks", "import", "@typescript-eslint", "prettier"],
  extends: [
    // "next",
    // "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest-dom/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:testing-library/react",
  ],
  rules: {
    "react/function-component-definition": [
      "error",
      { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
    ],
    "linebreak-style": ["error", process.platform === "win32" ? "windows" : "unix"],
    "react/prop-types": "off",
    "import/no-default-export": "error",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object"],
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "@chakra-ui/icons",
            group: "external",
            position: "before",
          },
          {
            pattern: "@chakra-ui/react",
            group: "external",
            position: "before",
          },
          {
            pattern: "framer-motion",
            group: "external",
            position: "before",
          },
          {
            pattern: "formik",
            group: "external",
            position: "before",
          },
          {
            pattern: "components",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    "@typescript-eslint/ban-ts-comment": "off",

    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
    "@typescript-eslint/explicit-module-boundary-types": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/no-explicit-any": ["off"],

    "jsx-a11y/click-events-have-key-events": "off",

    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
};
