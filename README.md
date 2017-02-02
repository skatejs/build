SkateJS build
=============

This is the build that all SkateJS repositories should use. You can use this in any project you want, though.

To install:

```sh
npm install skatejs-build --save
```

To template out a new project:

```js
sk-init
```

## Commands

The following commands are available:

### `sk-bundle`

Creates a bundle for your app / lib in `dist/`. Both minified and unminified files are created with sourcemaps. The `dist/` directory is ignored by Git, but will be published upon release.

### `sk-commit`

Shorthand for using `git cz`.

### `sk-init`

Templates out a new project. If run in an existing project, it won't overwrite any files and will create any files that don't already exist.

This command also sets up [`commitizen`](https://github.com/commitizen/cz-cli) and [`semantic-release`](https://github.com/semantic-release/semantic-release) so you can have fully automated releases.

### `sk-release`

This is automatically called in CI upon a successful build to publish a release. Whether or not a release actually happens is up to semantic release.

### `sk-server`

Runs `webpack-dev-server`.

### `sk-tests`

Runs the tests once in Karma.

### `sk-tests-watch`

Runs the tests in watch mode for development.

### `sk-lint`

Runs eslint semistandard rules to check code styleguide

### `sk-lint-fix`

Automatically fixes eslint rule violations.

