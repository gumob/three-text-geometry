// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from "@typescript-eslint/parser";
import tsdoc from 'eslint-plugin-tsdoc';
import "eslint-plugin-only-warn";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    plugins: {
      "tsdoc": tsdoc,                                      // TSDoc plugin for linting TSDoc comments
    },
    languageOptions: {
      parser: tsParser,                                    // TypeScript parser for ESLint
      parserOptions: {
        project: "tsconfig.json",                          // Path to the TypeScript configuration file
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "tsconfig.json",                        // Path to the TypeScript configuration for import resolution
        },
      },
    },
    rules: {
      "no-unused-vars": "off",                             // Disable the rule for unused variables
      "no-this-alias": "off",                              // Disable the rule for aliasing 'this'
      "no-case-declarations": "off",                       // Disable the rule for case declarations
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "varsIgnorePattern": "^_",
          "argsIgnorePattern": "^_",
        },
      ],                                                   // Disable TypeScript rule for unused variables
      "@typescript-eslint/no-non-null-assertion": "off",   // Disable TypeScript rule for non-null assertions
      "@typescript-eslint/no-this-alias": "off",           // Disable TypeScript rule for aliasing 'this'
      "@typescript-eslint/no-explicit-any": "off",         // Disable TypeScript rule for using 'any' type
      "@typescript-eslint/no-unsafe-call": "off",          // Disable TypeScript rule for unsafe calls
      "tsdoc/syntax": "warn",                              // Enable TSDoc syntax
    },
    files: [
      'src/**/*.ts',
      'src/**/*.tsx',
    ],
    ignores: [
      ".yalc",
      ".vscode",
      ".github",
      "node_modules",
      "dist-cjs",
      "dist-esm",
      "tests",
      "jest.config.ts",
      "jest.config.e2e.ts",
      "scripts",
      "coverage",
      "demo",
    ]
  }
);