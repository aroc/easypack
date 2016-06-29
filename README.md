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

## The structure of an EasyPack task
EasyPack tasks are structured in JSON objects where each key is some meaningful config option for that task. The options are:

#### "name": "{TASK_NAME}"
The name of your task. This name is used for two purposes:
1. To log to the terminal when the task is starting and has finished.
2. Used in the `depends_on` key in other tasks to handle running dependent tasks.

#### "what": "{TASK_TO_BE_RUN}"
The "what" key defines the name of the task to be run. If it's one of the default EasyPack tasks below, then it runs that task. If EasyPack doesn't find a task with the value in this key then it tries to run a custom task. Custom tasks are fund in `{YOUR_PROJECT_ROOT}/easypack-tasks/{PATH_TO_TASK_WITH_JS_EXTENSION}`. How to build custom tasks are explained in this readme, here.

#### "output": "{PATH_TO_FILE}"
The path to the file that will be created from this task. Be sure to include the path, filename and extension. For example, `./build/js/build.js`.

#### "entry": "{ENTRY_FILE_FOR_BUILD_TASK}"
The entry file for the given task if it requires it.

#### "minify_after": {TRUE or FALSE} - OPTIONAL
Whether or not to create an additional minified version of the output file after the task is run. The file is placed in the same spot as the file in `output` You can also omit this key if you don't want a minified version.

#### "watch_for_changes": {ARRAY OF PATHS OR SINGLE PATH}
An array of strings or a single string representing the paths to watch for file changes. If any of these files change, this task is re-run. You can also use wildcard paths here. For example: `"watch_for_changes": "./client/js/**/*"`

#### "depends_on": {ARRAY OF TASK NAMES} - OPTIONAL
An array of strings representing the names of tasks to be run before this task is run.

#### "files": {ARRAY OF FILES}
For tasks like `concatenate`, instead of `entry` the task requires an array of files to concatenate together.

#### "paths": {ARRAY OF PATHS}
Paths to be use dby the task, like the `server` task which fires up a server and serves the directories supplied in this key.

## EasyPack default tasks and supported options

#### "what": "js-browserify-babelify"
Runs browserify and babelify with the path to the entry file supplied by the `entry` key. You can specify what babel presets and plugins to run with the keys `babel_plugins` and `babel_presets`. Example task:

```json
{
  "name": "browserified-js",
  "what": "js-browserify-babelify",
  "output": "./dist/build.js",
  "entry": "./demo-app/js/with_modules/index.js",
  "minify_after": true,
  "babel_presets": [
    "es2015",
    "react"
  ],
  "babel_plugins": ["transform-class-properties"],
  "watch_for_changes":  "./demo-app/js/with_modules/**/*.js"
}
```

#### "what": "concatenate"
Concatenates the files specified by the `files` key together. Example task:
```json
{
  "name": "concatenated-javascript",
  "what": "concatenate",
  "output": "./dist/concatenated.js",
  "files": [
    "./demo-app/js/without_modules/user.js",
    "./demo-app/js/without_modules/index.js"
  ]
}
```

#### "what": "css-postcss"
Builds a single CSS file starting at the file specified by the `entry` key. Follows `@import` statements to add the other files. Runs `postcss` on these files to ensure CSS features not fully supported by all browsers are polyfilled. Example task:
```json
{
  "name": "postcss-styles",
  "what": "css-postcss",
  "output": "./dist/build.css",
  "entry": "./demo-app/style/postcss/main.css",
  "minify_after": true,
  "watch_for_changes":  "./demo-app/style/postcss/**/*.css"
}
```

#### "what": "css-less"
Builds a single CSS file with the LESS CSS preprocessor, starting at the file specified by the `entry` key. Example task:
```json
{
  "name": "less-styles",
  "what": "css-less",
  "output": "./dist/less.css",
  "entry": "./demo-app/style/less/main.less",
  "minify_after": true,
  "watch_for_changes":  "./demo-app/style/less/**/*.css"
}
```

#### "what": "server"
Runs a server, serving the directories supplied by the `paths` key. Runs by default on port `8080`, but you can configure which port to run it on with the `port` key. Example task:
```json
{
  "name": "server",
  "what": "server",
  "paths": ["public", "dist"]
}
```