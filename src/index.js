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

  // Server Tasks
  "server":                       require('./tasks/javascript/server.js'),

  // General Tasks
  "concatenate":                  require('./tasks/common/concatenate.js')
};
let taskNames = [];
let manifest = require('../manifest.json');

for (let i=0; i < manifest.tasks.length; i++) {
  let details = manifest.tasks[i];
  taskNames.push(details.name);

  // Define the Gulp taks
  gulp.task(details.name, taskMap[details.what](details));

  // Add minification task if required
  if (details.minify_after) createMinificationTask(details);
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