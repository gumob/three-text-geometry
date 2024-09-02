import * as Fs from 'fs'
import type { Config } from '@jest/types'
import { pathsToModuleNameMapper } from 'ts-jest'
import TypeScript from 'typescript'

const tsconfig = TypeScript.readConfigFile('tsconfig.json', (path) =>
  Fs.readFileSync(path, { encoding: 'utf-8' })
)

const config: Config.InitialOptions = {
  preset: 'ts-jest',
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
  modulePathIgnorePatterns: ['<rootDir>/demo/'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'node',
}

export default config
