'use strict'

// The package.json
const pkg = require('../package.json');

// Gulp, of course!
const gulp = require('gulp');

// Utilities
const gutil = require('gulp-util');

let taskMap = {
  // JS Tasks
  "javascript modules":           require('./tasks/javascript/modules.js'),
  "minify javascript file":        require('./tasks/javascript/minify.js'),
  
  // CSS Tasks
  "css imports":                  require('./tasks/css/imports.js'),
  "minify css file":              require('./tasks/css/minify.js'),

  // Server Tasks
  "server":                       require('./tasks/javascript/server.js'),
};
let taskNames = [];
let manifest = require('../manifest.json');

for (let i=0; i < manifest.tasks.length; i++) {
  let details = manifest.tasks[i];
  taskNames.push(details.name);

  // Define the Gulp taks
  gulp.task(details.name, taskMap[details.what](details));

  if (details.minify_after) {
    details.input = details.output;
    let taskName = `minify-${details.name}`;
    taskNames.push(taskName);

    if (details.what.indexOf('javascript') > -1) {
      gulp.task(taskName, [details.name], taskMap['minify javascript file'](details));
    }
    else if (details.what.indexOf('css') > -1) {
      gulp.task(taskName, [details.name], taskMap['minify css file'](details));
    }
  }
}

// Run gulp!
gulp.task('default', taskNames);
gulp.start();