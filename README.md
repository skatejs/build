SkateJS build
=============

This is the build that all SkateJS repositories should use.

To set up your project:

1. Create a `.gulprc` file and put `{ "base": "node_modules/skatejs-build/task" }` in it.
2. Create a `gulpfile.js` and put `require('skatejs-build');` in it.

To get a list of commands run:

```sh
gulp
```

To generate a base project structure run:

```sh
gulp init
```

If you have conflicting files, they will *not* be overwritten.
