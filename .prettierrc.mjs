// @ts-check

/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig } */

const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports"                                  // A plugin to sort import statements in a specified order. <https://github.com/IanVS/prettier-plugin-sort-imports#importorder>
  ],
  importOrder: [
    "^(react/(.*)$)|^(react$)|^(react-native(.*)$)",
    "^(next/(.*)$)|^(next$)",
    "^(expo(.*)$)|^(expo$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@acm/(.*)$",
    "^acm/(.*)$",
    "^@/",
    "^~/",
    "^[../]",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],    // Specifies the parser plugins for import order, enabling TypeScript and JSX support. <https://github.com/IanVS/prettier-plugin-sort-imports#importorder>
  importOrderTypeScriptVersion: "5.5.4",                                   // Specifies the TypeScript version to ensure compatibility with the parser plugins. <https://github.com/IanVS/prettier-plugin-sort-imports#importorder>
  arrowParens: "always",                                                   // Controls the use of parentheses around arrow function parameters. <https://prettier.io/docs/en/options.html#arrow-function-parentheses>
  printWidth: 300,                                                         // Specifies the line length that Prettier will wrap on. <https://prettier.io/docs/en/options.html#print-width>
  singleQuote: false,                                                      // If true, uses single quotes instead of double quotes for strings. <https://prettier.io/docs/en/options.html#quotes>
  semi: true,                                                              // If true, adds a semicolon at the end of every statement. <https://prettier.io/docs/en/options.html#semicolons>
  trailingComma: "all",                                                    // Controls the printing of trailing commas wherever possible. <https://prettier.io/docs/en/options.html#trailing-commas>
  tabWidth: 2,                                                             // Specifies the number of spaces per indentation level. <https://prettier.io/docs/en/options.html#tab-width>
  proseWrap: "always",                                                     // Controls how prose is wrapped in markdown files. <https://prettier.io/docs/en/options.html#prose-wrap>
}

export default config;