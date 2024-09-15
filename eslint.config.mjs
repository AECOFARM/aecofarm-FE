import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsparser,
      globals: globals.browser,
    },
    plugins: {
      react: pluginReact,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.recommended,
  tseslint.configs.recommended,
  {
    extends: ["plugin:prettier/recommended"],
  },
];
