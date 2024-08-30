// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from "@typescript-eslint/parser";
import "eslint-plugin-only-warn";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      parser: tsParser,                            // TypeScript parser for ESLint
      parserOptions: {
        project: "tsconfig.json",                  // Path to the TypeScript configuration file
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "tsconfig.json",                // Path to the TypeScript configuration for import resolution
        },
      },
    },
    rules: {
      "no-unused-vars": 0,                         // Disable the rule for unused variables
      "no-this-alias": 0,                          // Disable the rule for aliasing 'this'
      "@typescript-eslint/no-unused-vars": 0,      // Disable TypeScript rule for unused variables
      "@typescript-eslint/no-this-alias": 0,       // Disable TypeScript rule for aliasing 'this'
      "@typescript-eslint/no-explicit-any": 0,     // Disable TypeScript rule for using 'any' type
    },
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    ignores: [
      ".build",
      ".vscode",
      ".yarn",
      "eslint.config.mjs",
      "node_modules",
      "public",
    ]
  }
);