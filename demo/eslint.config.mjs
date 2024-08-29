// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",                     // Disable the rule for unused variables
      "no-this-alias": "off",                      // Disable the rule for aliasing 'this'
      "@typescript-eslint/no-unused-vars": 0,      // Disable TypeScript rule for unused variables
      "@typescript-eslint/no-this-alias": 0,       // Disable TypeScript rule for aliasing 'this'
      "@typescript-eslint/no-explicit-any": 0,     // Disable TypeScript rule for using 'any' type
    },
  }
);