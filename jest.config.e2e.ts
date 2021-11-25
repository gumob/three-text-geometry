import * as Fs from 'fs'
import type { InitialOptionsTsJest } from 'ts-jest/dist/types'
import { pathsToModuleNameMapper } from 'ts-jest/utils'
import * as TypeScript from 'typescript'

const tsconfig = TypeScript.readConfigFile('tsconfig.json', (path) =>
  Fs.readFileSync(path, { encoding: 'utf-8' })
)

const config = {
  preset: 'jest-playwright-preset',
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.config.compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  resolver: 'ts-jest-resolver',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects',
    'jest-watch-suspend',
  ],
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['/**/*.e2e.js', '/**/*.e2e.ts'],
  modulePathIgnorePatterns: ['<rootDir>/demo/'],
  transform: {
    '^.+.(ts|tsx)$': 'ts-jest',
  },
  testEnvironmentOptions: {
    'jest-playwright': {
      // browsers: ['chromium', 'firefox', 'webkit'],
      // browsers: ['chromium'],,
      devices: [],
      launchOptions: {
        headless: false,
        // slowMo: 600,
      },
      contextOptions: {
        ignoreHTTPSErrors: true,
        viewport: {
          width: 1920,
          height: 1080
        }
      },
    },
  },
}

export default config
