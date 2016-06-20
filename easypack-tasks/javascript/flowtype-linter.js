'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const flow = require('gulp-flowtype');

module.exports = function (details) {
  return function () {
    return gulp.src(details.files)
      .pipe(flow({
        all: false,
        weak: false,
        declarations: './declarations',
        killFlow: false,
        beep: true,
        abort: false
      }))
      .pipe(eslint({
        ecmaFeatures: {
          jsx: true
        },
        parser: 'babel-eslint',
        rules: {
          'strict': 0
        }
      }))
      // Output results to the console
      .pipe(eslint.format())
      // Exit process with an error code (1) on error
      .pipe(eslint.failAfterError());
  }
};