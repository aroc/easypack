'use strict';

const gulp = require('gulp');
const minifyCSS = require('gulp-minify-css');
const rename = require('gulp-rename');
const Utils = require('../../utils/index.js');

module.exports = function (details) {
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return gulp.src(details.output)
      .pipe(minifyCSS({ compatibility: 'ie9' }))
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(outputs.dir));
  }
};