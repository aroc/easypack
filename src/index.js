'use strict'

// The package.json
const pkg = require('../package.json');

// Gulp, of course!
const gulp = require('gulp');

// Utilities
const fs   = require('fs');
const yaml = require('js-yaml');
const gutil = require('gulp-util');

// JS building
const babelify = require('babelify');
const browserify = require('browserify');
const uglify = require('gulp-uglify');

// Style building
const minifyCSS = require('gulp-minify-css');
const postcss = require('gulp-postcss');
const postcssCSSNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');

// Server running
const connect = require('gulp-connect');

let taskMap = {
  "javascript modules": require('./tasks/javascript/modules.js'),
  "server":             require('./tasks/javascript/server.js'),
  "css imports":        require('./tasks/css/imports.js')
};
let taskNames = [];

// Get document, or throw exception on error
fs.readFile('./manifest.yml', 'utf8', (err, data) => {
  if (err) {
    throw err;
  } else {
    let manifest = yaml.safeLoad(data);

    for (let i=0; i < manifest.tasks.length; i++) {
      let details = manifest.tasks[i];
      taskNames.push(details.name);

      // Define the Gulp taks
      gulp.task(details.name, taskMap[details.what](details));
    }

    // Run gulp!
    gulp.task('default', taskNames);
    gulp.start();
  }
});