# Directory Structure

This project is organized as a TypeScript library for Three.js BMFont text geometry, with a separate demo React app.

```
/
├── src/                          # Core library source code
│   ├── helpers/                  # Helper modules for geometry and layout
│   ├── parser/                   # BMFont parsers (JSON, XML, ASCII, Binary)
│   ├── error/                    # Error handling modules
│   ├── layout/                   # Text layout logic
│   ├── shader/                   # Shader code for rendering
│   ├── shaders/                  # Additional shader resources
│   ├── types/                    # TypeScript type definitions and interfaces
│   ├── utils/                    # Utility functions
│   ├── TextGeometry.ts           # Main TextGeometry implementation (TypeScript)
│   ├── TextGeometry.js           # Main TextGeometry implementation (JavaScript, built)
│   └── index.ts                  # Library entry point
├── dist-cjs/                     # CommonJS build output
├── dist-esm/                     # ES Module build output
├── demo/                         # Demo React app (see demo/README.md)
├── tests/                        # Unit and E2E tests
├── docs/                         # Documentation assets
├── node_modules/                 # Dependency packages
├── .github/                      # GitHub workflows and configuration
├── .husky/                       # Husky git hooks
├── .cursor/                      # Cursor IDE configuration
├── coverage/                     # Test coverage reports
├── README.md                     # Project documentation
├── TECHNOLOGSTACK.md             # Technology stack documentation
├── DIRECTORYSTRUCTURE.md         # Directory structure documentation
├── CHANGELOG.md                  # Changelog
├── LICENSE                       # License information
├── package.json                  # Project settings and dependencies
├── pnpm-lock.yaml                # Dependency lock file
├── tsconfig.json                 # TypeScript configuration (base)
├── tsconfig.cjs.json             # TypeScript config for CJS build
├── tsconfig.esm.json             # TypeScript config for ESM build
├── jest.config.ts                # Jest unit test configuration
├── jest.config.e2e.ts            # Jest E2E test configuration
├── eslint.config.mjs             # ESLint configuration
├── .prettierrc.mjs               # Prettier configuration
├── .prettierignore               # Prettier ignore patterns
├── .gitignore                    # Git ignore patterns
├── .commitlintrc.json            # Commitlint configuration
├── .mise.toml                    # Development environment settings
├── package-scripts.sh            # Build and development scripts
├── typedoc.mjs                   # Typedoc configuration
└── FUNDING.yml                   # Funding configuration
```

## Directory Descriptions

### Source Code (`src/`)
- `helpers/`: Helper modules for geometry and layout
- `parser/`: BMFont parsers (JSON, XML, ASCII, Binary)
- `error/`: Error handling modules
- `layout/`: Text layout logic
- `shader/`, `shaders/`: Shader code and resources
- `types/`: TypeScript type definitions and interfaces
- `utils/`: Utility functions
- `TextGeometry.ts`: Main TextGeometry implementation (TypeScript)
- `index.ts`: Library entry point

### Build Outputs
- `dist-cjs/`: CommonJS build output
- `dist-esm/`: ES Module build output

### Demo Application
- `demo/`: Standalone React app demonstrating library usage

### Testing
- `tests/`: Unit and E2E tests
- `coverage/`: Test coverage reports

### Documentation
- `docs/`: Documentation assets
- `README.md`: Project overview and usage
- `TECHNOLOGSTACK.md`: Technology stack
- `DIRECTORYSTRUCTURE.md`: Directory structure
- `CHANGELOG.md`: Changelog
- `LICENSE`: License information

### Configuration & Scripts
- `package.json`: Project metadata and dependencies
- `pnpm-lock.yaml`: Dependency lock file
- `tsconfig*.json`: TypeScript configuration files
- `jest.config*.ts`: Jest configuration files
- `eslint.config.mjs`: ESLint configuration
- `.prettierrc.mjs`, `.prettierignore`: Prettier configuration
- `.gitignore`: Git ignore patterns
- `.commitlintrc.json`: Commitlint configuration
- `.mise.toml`: Development environment manager settings
- `package-scripts.sh`: Build and development scripts
- `typedoc.mjs`: Typedoc configuration
- `FUNDING.yml`: Funding configuration
- `.github/`, `.husky/`, `.cursor/`: Tool-specific configuration directories
