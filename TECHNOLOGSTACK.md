# Technology Stack

## Core Technologies

- TypeScript: ^5.8.3
- Node.js: ^20.x
- Three.js: ^0.172.0
- BMFont (bitmap font) support

## Library Usage

- Three.js for 3D rendering and geometry
- BMFont parsers (JSON, XML, ASCII, Binary)
- Fast-xml-parser for XML font parsing
- Ajv for JSON schema validation
- React (for demo and testing): ^19.1.0
- @react-three/fiber (for demo): ^9.1.2
- SWR (for demo): ^2.3.3

## Demo Application

- React: ^19.1.0
- Vite (for demo build and dev server)
- @react-three/fiber: ^9.1.2
- Three.js: ^0.172.0

## Development Tools

### Code Quality

- ESLint: ^9.29.0
- Prettier: ^3.6.0
- @typescript-eslint (plugin & parser): ^8.34.1
- Commitlint: ^19.8.1
- Husky: ^9.1.7 (Git hooks)

### Testing

- Jest: ^30.0.2 (Unit Testing)
- ts-jest: ^29.4.0 (TypeScript support for Jest)
- Playwright: ^1.53.1 (E2E Testing)
- jest-playwright-preset: ^4

### Documentation

- Typedoc: ^0.28.5
- typedoc-plugin-merge-modules: ^7.0.0
- typedoc-plugin-rename-defaults: ^0.7.3

### Build System

- TypeScript Compiler (tsc)
- pnpm: 9.x (Package management)
- Uglify-js: ^3.19 (Minification)

### Release & Automation

- Semantic Release: ^24.2.5 (Automated release)
- pinst: ^3 (Git hooks management for CI)

### Type Definitions

- @types/three: ^0.172.0
- @types/react: ^19.1.8
- @types/node: ^20.19.1
- @types/jest: ^30.0.0

## Dependencies

- three: ^0.172.0
- ajv: ^8.x
- fast-xml-parser: ^5.2.5
- swr: ^2.3.3 (demo)
- @react-three/fiber: ^9.1.2 (demo)
- react: ^19.1.0 (demo)

## Development Environment

- VSCode
- Cursor IDE
- mise (Development environment manager)

## Implementation Rules

### Code Organization

- Modular, reusable TypeScript modules
- Strict TypeScript type checking
- ESLint and Prettier for code style enforcement
- Commitlint and Husky for commit message and pre-commit checks
- Typedoc for API documentation
- Jest and Playwright for testing

### Build Process

- TypeScript for building CJS and ESM outputs
- Minification with Uglify-js
- Automated release with Semantic Release
- Type checking and linting in CI/CD pipeline
- Automated testing in CI/CD pipeline

### Development Workflow

- Development mode with watch build
- Production build optimization
- Type checking and linting in CI/CD pipeline
- Automated release and changelog generation
