# EasyPack
The fastest, easiest, most straightforward way to build assets for the web. Powered by Gulp behind the scenes, you can easily plug in your own custom Gulp tasks and make use of the huge Gulp plugin ecosystem whenever you need more customization.

## How does it work?
EasyPack works by letting you define tasks inside an `easypack.json` file. Most of the common web asset build tasks are already part of EasyPack's default task set, so you only need to define the name and some simple options for each task. If there's a custom task you want to run, you can do that too.

## Quick Start Guide
1. Install EasyPack as a development dependency `npm install --save-dev easypack`.
2. Create a `easypack.json` file in the root of your project directory. An example `easypack.json` file is below.
3. Add an entry in your `package.json` scripts to run EasyPack, for example:
```sh
"scripts": {
  "dev": "easypack"
}
```
4. Run easypack with the npm script you created: `npm run dev`.

## How to make an easypack.json file
`easypack.json` files are what EasyPack looks for to know how to build your assets. It consists of a single array of objects under the `tasks` key. Each object in the array is a task that should be run.

### Example easypack.json file

The following example `easypack.json` file has 2 tasks:

1. The first task builds a `browserified` and `babelified` React app. It also creates a minified copy of the output (with `minify_after: true`) and finally it watches the `./my-app/js/**/*.js` path for changes to files and re-runs the task when it happens.
2. The second task builds a single CSS build file and allows the use of currently not fully supported CSS features using `postcss`. It also creates a minified copy afterwards and watches the `./my-app/css/**/*.css` path and re-runs if anything changes.

```json
{
  "tasks": [
    {
      "name": "browserified-js",
      "what": "js-browserify-babelify",
      "output": "./dist/build.js",
      "entry": "./my-app/js/index.js",
      "minify_after": true,
      "babel_presets": [
        "es2015",
        "react"
      ],
      "babel_plugins": ["transform-class-properties"],
      "watch_for_changes":  "./my-app/js/**/*.js"
    },
    {
      "name": "postcss-styles",
      "what": "css-postcss",
      "output": "./dist/build.css",
      "entry": "./my-app/style/main.css",
      "minify_after": true,
      "watch_for_changes":  "./my-app/css/**/*.css"
    }
  ]
}
```

## EasyPack default tasks and supported options

### js-browserify-babelify