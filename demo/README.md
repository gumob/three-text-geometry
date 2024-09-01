# Getting Started with Demo

This demo project works with [Vite](https://github.com/vitejs/vite).

## Clone the repository

```
git clone https://github.com/gumob/three-text-geometry.git
cd three-text-geometry/demo
```

## Install dependencies

Setup yarn and install dependencies

```
yarn cache clean
corepack enable
yarn set version stable
yarn -v
yarn install
```

## Configure SDKs for Cursor (VSCode)

```log
Cannot find module `***` or its corresponding type declarations
```

Please refer to the detailed instructions at [Yarn Official Docs](https://yarnpkg.com/getting-started/editor-sdks#vscode).

1) Install the ZipFS extension

    Cursor:

    ```
    cursor --install-extension arcanis.vscode-zipfs
    ```

    VSCode:

    ```
    code --install-extension arcanis.vscode-zipfs
    ```

2) Run the following command, which will generate a .vscode/settings.json file:

    ```
    yarn dlx @yarnpkg/sdks vscode
    ```

3) For safety reason VSCode requires you to explicitly activate the custom TS settings:

    1) Press ctrl+shift+p in a TypeScript file
    
    2) Choose "Select TypeScript Version"

    3) Pick "Use Workspace Version"


## Available Scripts

In the project directory, you can run:

### `yarn build`
Builds the application for production. It optimizes the build for the best performance and outputs the files to the `build` directory. The build is minified, and the filenames include hashes for better caching.

### `yarn dev`
Runs the application in development mode. It enables hot reloading, allowing you to see changes in real-time. Open [http://localhost:5173/](http://localhost:5173/) to view the application in your browser.

### `yarn lint`
Runs the linter to check for code quality and style issues. It helps ensure that the code adheres to the defined coding standards and best practices.

### `yarn preview`
Serves the production build locally for previewing. This command allows you to test the production build before deploying it to ensure everything works as expected.


## Learn More

You can learn more in the [Vite Official Documentation](https://vitejs.dev/guide/).

To learn React, check out the [React Official Documentation](https://react.dev/reference/react).
