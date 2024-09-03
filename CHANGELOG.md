# [0.1.0](https://github.com/gumob/three-text-geometry/compare/0.0.0...0.1.0) (2024-09-03)


### Bug Fixes

* add clipCullDistance and multiDraw extensions to ShaderMaterialParameters class and fix build the error below: ([5c33c3b](https://github.com/gumob/three-text-geometry/commit/5c33c3be467f882b71f94b0d8fa7eaf3f9b63599))
* build source ([bcfa80c](https://github.com/gumob/three-text-geometry/commit/bcfa80cef3d21d69f6234f244ab78284410b6869))
* **DemoBase.tsx:** Prevent duplicate registration of event listeners and clean up on component unmount ([c22e2dd](https://github.com/gumob/three-text-geometry/commit/c22e2dd7ba775f3d1d846b6d4bdff109aa62e50e))
* **DemoBase:** Add didInitScene flag to prevent multiple initialization in componentDidMount ([c891a84](https://github.com/gumob/three-text-geometry/commit/c891a84ed9c6adaf2c2ed2fcbf5d37064e2abdc2))
* **DemoBase:** update animationFrameID to a number type and change fps limit to 120 for better performance and consistency ([cd6d306](https://github.com/gumob/three-text-geometry/commit/cd6d306518fb6ffae918f74bb3f25fc9e6deb4dd))
* DemoMultipage, DemoShader, DemoShuffle, DemoShuffleShader - Add null checks before cancelling animation frames and timeouts in componentWillUnmount to avoid TypeError when unmounting components with undefined animationFrameID or timeoutID. ([c620c6f](https://github.com/gumob/three-text-geometry/commit/c620c6f4db7e35908b88c4d3c2858e96e5d01a96))
* **effects/shuffle.ts:** remove unnecessary replaceAll() call in shuffleText class constructor ([f50f8f9](https://github.com/gumob/three-text-geometry/commit/f50f8f9f20a951d478c0b9a1962acb92c6df6261))
* error UnhandledPromiseRejectionWarning caused by chalk ([fa030f4](https://github.com/gumob/three-text-geometry/commit/fa030f409ab20c00d7a5041aba2f5f8fb5169c56))
* **eslint:** Resolve TSDoc errors ([3a409b8](https://github.com/gumob/three-text-geometry/commit/3a409b8b61daeb6e017da4c95a335a861856346f))
* remove unused parameter from ShuffleText callback function ([4143ea1](https://github.com/gumob/three-text-geometry/commit/4143ea15c4161a143cbccec47a89d6961cb43582))
* removed --dry-run option ([cd89e96](https://github.com/gumob/three-text-geometry/commit/cd89e96904869116c16c722a5cc16aaaf26b36c4))
* set needsUpdate to true ([6afb9b6](https://github.com/gumob/three-text-geometry/commit/6afb9b6bdcb814e626faede63958609ff8062eed))
* **tests:** Replace gl and three imports with mock versions for testing purposes ([3b528ee](https://github.com/gumob/three-text-geometry/commit/3b528ee38e196b49bcca249328f062a880830ad5))
* TODO: Fix `Rollup failed to resolve import` error ([62bf7cf](https://github.com/gumob/three-text-geometry/commit/62bf7cfdcbf2f77b7deb7c74238d36a3555cb392))
* **tsconfig:** disable incremental compilation due to broken build process (find: dist-cjs and dist-esm: No such file or directory) ([a9a9074](https://github.com/gumob/three-text-geometry/commit/a9a9074c09490b7b5cbfc9f1507142f07144a34f))
* Update dependencies for Three.js and refactor Stats and OrbitControls imports to use addons instead of examples, also update the Stats instance creation to use constructor instead of factory method. ([6e4417a](https://github.com/gumob/three-text-geometry/commit/6e4417a5e026412ae849ce055289b0e6b1d6fad5))
* Update selected option parsing to use cut command for better handling of options with colons in their names ([522de2b](https://github.com/gumob/three-text-geometry/commit/522de2bea0c06e678db7362d634dd573531e7bf3))
* upgrade dependency ([09ab9be](https://github.com/gumob/three-text-geometry/commit/09ab9beb572e0681065cca6c236487ca39e4c648))


### Features

* **ci:** Update CI/CD workflow with version tagging ([b2d5457](https://github.com/gumob/three-text-geometry/commit/b2d545760b6bcf445e8e16ed54b2047a200afb63))
* **demo/src:** update demo shaders to use consistent color value (0x999999) across all demos ([bc877ad](https://github.com/gumob/three-text-geometry/commit/bc877ad79f6648111e122a48f92e2ace15912745))
* **DemoBase:** Add FPS limit ([6f0c2df](https://github.com/gumob/three-text-geometry/commit/6f0c2dfc55d729055a62fba005912484c039efcc))
* **demo:** create basic HTML structure for demo page with Vite setup ([367d43a](https://github.com/gumob/three-text-geometry/commit/367d43a52cd81ffe3873d4c31f55f710a265bca5))
* **demo:** update components to use class syntax instead of constructor function ([cf668ea](https://github.com/gumob/three-text-geometry/commit/cf668eacfbd61c7198c3d59ac2f21a464c9c7338))
* **package-scripts.sh:** Add support for Pnpm and remove Yarn setup script ([9a8836d](https://github.com/gumob/three-text-geometry/commit/9a8836d9a709f849e1cedede8e0131c84035244a))
* **package-scripts.sh:** Add test-e2e script to run E2E tests ([0d72624](https://github.com/gumob/three-text-geometry/commit/0d72624f7e52dbd21213ecadf34e2598202f62d9))
* **package-scripts:** Remove unused build scripts for CommonJS and ESModule, add modules-reinstall script ([7b31627](https://github.com/gumob/three-text-geometry/commit/7b316276c523075f256375ea545abd9382e87489))
* **package.json:** update minify scripts to use uglifyjs for better minification and source map support ([6fcf382](https://github.com/gumob/three-text-geometry/commit/6fcf382c12a76005838936022e7beea3cfe8f4b6))
* release 0.1.0 ([04abfe0](https://github.com/gumob/three-text-geometry/commit/04abfe07f370cfe3af03415f084236a4c826691a))
* Update yarn.sh script to use pnpm and add support for running various tasks with fzf selection, including format fixes, lint checks, build, minify, dev server start, tests, test coverage, cleaning, pre-publish, post-publish, TOC reflection, typedoc generation, and all tasks. ([f0afd39](https://github.com/gumob/three-text-geometry/commit/f0afd392ae26e8ae93291b11d86c8a4f8fdce4cc))

## [0.0.1-beta.5](https://github.com/gumob/three-text-geometry/compare/0.0.1-beta.4...0.0.1-beta.5) (2022-02-04)

### Bug Fixes

- error UnhandledPromiseRejectionWarning caused by chalk ([fa030f4](https://github.com/gumob/three-text-geometry/commit/fa030f409ab20c00d7a5041aba2f5f8fb5169c56))

## [0.0.1-beta.4](https://github.com/gumob/three-text-geometry/compare/0.0.1-beta.3...0.0.1-beta.4) (2022-02-03)

### Bug Fixes

- upgrade dependency ([09ab9be](https://github.com/gumob/three-text-geometry/commit/09ab9beb572e0681065cca6c236487ca39e4c648))

## [0.0.1-beta.3](https://github.com/gumob/three-text-geometry/compare/0.0.1-beta.2...0.0.1-beta.3) (2022-02-03)

### Bug Fixes

- build source ([bcfa80c](https://github.com/gumob/three-text-geometry/commit/bcfa80cef3d21d69f6234f244ab78284410b6869))

## [0.0.1-beta.2](https://github.com/gumob/three-text-geometry/compare/0.0.1-beta.1...0.0.1-beta.2) (2022-02-03)

### Bug Fixes

- set needsUpdate to true ([6afb9b6](https://github.com/gumob/three-text-geometry/commit/6afb9b6bdcb814e626faede63958609ff8062eed))

## [0.0.1-beta.1](https://github.com/gumob/three-text-geometry/compare/0.0.0...0.0.1-beta.1) (2021-12-09)

### Bug Fixes

- removed --dry-run option ([cd89e96](https://github.com/gumob/three-text-geometry/commit/cd89e96904869116c16c722a5cc16aaaf26b36c4))
