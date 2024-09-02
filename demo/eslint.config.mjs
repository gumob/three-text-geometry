// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import "eslint-plugin-only-warn";
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    ignores: ['dist']
  },
  {
    extends: [
      eslint.configs.recommended,                      // Use recommended ESLint settings
      ...tseslint.configs.recommended,                 // Spread recommended settings
      eslintConfigPrettier,                            // Integrate Prettier with ESLint
    ],
    languageOptions: {
      parser: tsParser,                                // TypeScript parser for ESLint
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      "no-unused-vars": "off",                         // Disable the rule for unused variables
      "no-this-alias": "off",                          // Disable the rule for aliasing 'this'
      "@typescript-eslint/no-unused-vars": "off",      // Disable TypeScript rule for unused variables
      "@typescript-eslint/no-this-alias": "off",       // Disable TypeScript rule for aliasing 'this'
      "@typescript-eslint/no-explicit-any": "off",     // Disable TypeScript rule for using 'any' type
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      "react-hooks/rules-of-hooks": "error",           // Ensure hooks are used correctly
      "react-hooks/exhaustive-deps": "warn",           // Ensure effect dependencies are specified correctly
    },
    files: ['src/**/*.{ts,tsx}']
  },
);