# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A pure TypeScript port of JavaScript BMFont rendering libraries for Three.js. Renders bitmap fonts with word-wrapping, text alignment, kerning, and letter spacing. Supports JSON, XML, ASCII, and Binary font formats. Provides React Three Fiber integration.

## Commands

```bash
pnpm install          # Install dependencies (pnpm 9.15.0+, Node 20.8.1+)
pnpm build            # Full build (CJS + ESM + minification)
pnpm dev              # Watch mode for both CJS and ESM
pnpm test             # Run all tests
pnpm test-coverage    # Run tests with coverage
pnpm test-e2e         # Run E2E tests (requires Playwright)
pnpm lint-check       # ESLint check (max-warnings 0)
pnpm lint-fix         # ESLint auto-fix
pnpm format-check     # Prettier check
pnpm format-fix       # Prettier format
pnpm all              # format + lint + typedoc + build + test-coverage
```

Run a single test file: `pnpm jest tests/parser.spec.ts`

## Architecture

**Core class:** `src/TextGeometry.ts` — extends `THREE.BufferGeometry`. Takes a text string and `TextGeometryOption`, manages position/uv/page buffer attributes. Use `update(text?, option?)` to regenerate geometry.

**Layout engine:** `src/layout/TextLayout.ts` — calculates glyph positions with word wrapping, kerning, letter spacing, and alignment (left/center/right). `src/layout/WordWrap.ts` handles three wrap modes: Normal, Pre, NoWrap.

**Font parsers** (`src/parser/`): Four parsers implementing `IBMFontParser<T>` — `BMFontJsonParser` (with AJV schema validation), `BMFontXMLParser`, `BMFontAsciiParser`, `BMFontBinaryParser`. All parse into the common `BMFont` type defined in `src/types/BMFont.ts`.

**Shaders** (`src/shaders/`): GLSL shader sources for basic, SDF, and MSDF rendering. `src/shader/MultiPageShaderMaterial.ts` provides the material class for multi-texture fonts.

**React integration:** `src/helpers/fiber.ts` extends R3F for `<textGeometry>` JSX usage. `src/helpers/hook.ts` provides React hooks.

**Utilities** (`src/utils/`): `vertices.ts` (position/UV extraction), `quad-indices.ts` (index buffer generation), `compute.ts` (bounding box/sphere), `binary.ts` (binary data parsing).

## Build Output

Dual format: CommonJS (`dist-cjs/`, ES2018) and ESM (`dist-esm/`, ES2020). Both configured via separate tsconfig files (`tsconfig.cjs.json`, `tsconfig.esm.json`). Path aliases (`@three-text-geometry/*` → `./src/*`) are transformed at build time via `typescript-transform-paths`.

## Code Style

- Prettier: 300 char print width, single quotes, trailing commas, 2-space indent
- ESLint: strict unused variable warnings (underscore prefix ignored), JSDoc required on public APIs (classes, functions, methods, interfaces, type aliases)
- Commit messages: Conventional Commits format, enforced by commitlint via Husky pre-commit hook
- Import sorting handled by prettier-plugin-sort-imports

## Testing

- Jest 30 with ts-jest, jsdom environment
- Tests in `tests/*.spec.ts`, test fonts in `tests/fonts/`
- WebGL mocked via `tests/helpers/webgl-mock.ts` (no real GPU needed)
- CI runs tests with xvfb-run on Ubuntu (libgl1-mesa-dev for headless GL)

## Branch Strategy

- `main` — production releases (semantic-release auto-publishes to npm)
- `develop` — development branch
- Feature branches merge into develop
