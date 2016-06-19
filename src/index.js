'use strict'

const pkg = require('../package.json');
const gulp = require('gulp');
const gutil = require('gulp-util');

let taskMap = {
  // JS Tasks
  "javascript modules":           require('./tasks/javascript/modules.js'),
  "minify javascript file":       require('./tasks/javascript/minify.js'),
  
  // CSS Tasks
  "css imports":                  require('./tasks/css/imports.js'),
  "minify css file":              require('./tasks/css/minify.js'),

  // Utils
  "server":                       require('./tasks/utils/server.js'),

  // General Tasks
  "concatenate":                  require('./tasks/common/concatenate.js')
};
let taskNames = [];
let manifest = require('../manifest.json');

for (let i=0; i < manifest.tasks.length; i++) {
  let details = manifest.tasks[i];
  let dependencies = [];
  taskNames.push(details.name);

  if (details.depends_on) {
    dependencies = (details.depends_on.constructor === Array) ? details.depends_on : [details.depends_on];
  }

  // Define the Gulp taks
  gulp.task(details.name, dependencies, taskMap[details.what](details));

  // Add minification task if required
  if (details.minify_after === true) createMinificationTask(details);

  if (details.watch_for_changes) createWatchTask(details);
}

// Run gulp!
gulp.task('default', taskNames);
gulp.start();

// ***************************
// Utility functions
// ***************************

function createMinificationTask (details) {
  details.input = details.output;
  let taskName = `minify-${details.name}`;
  taskNames.push(taskName);

  let splitPath = details.output.split('.');
  let fileType = splitPath[splitPath.length-1];

  if (fileType === 'js') {
    gulp.task(taskName, [details.name], taskMap['minify javascript file'](details));
  }
  if (fileType === 'css') {
    gulp.task(taskName, [details.name], taskMap['minify css file'](details));
  }
}

function createWatchTask (details) {
  let files = (details.watch_for_changes.constructor === Array) ? details.watch_for_changes : [details.watch_for_changes]
  gulp.watch(files, [details.name]);
}