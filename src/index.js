'use strict'

// The package.json
const pkg = require('../package.json');

// Gulp, of course!
const gulp = require('gulp');

// Utilities
const gutil = require('gulp-util');

let taskMap = {
  "javascript modules": require('./tasks/javascript/modules.js'),
  "server":             require('./tasks/javascript/server.js'),
  "css imports":        require('./tasks/css/imports.js')
};
let taskNames = [];
let manifest = require('../manifest.json');

for (let i=0; i < manifest.tasks.length; i++) {
  let details = manifest.tasks[i];
  taskNames.push(details.name);

  // Define the Gulp taks
  gulp.task(details.name, taskMap[details.what](details));
}

// Run gulp!
gulp.task('default', taskNames);
gulp.start();