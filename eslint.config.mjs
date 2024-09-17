import reactPlugin from "eslint-plugin-react";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json", // Add this line
      },
    },
    plugins: {
      react: reactPlugin,
      "@typescript-eslint": tsPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/strict-boolean-expressions": "warn",
      "react/prop-types": "off",
    },
  },
];
