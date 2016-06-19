'use strict';

const path = require('path');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const Utils = require('../../utils/index.js');

module.exports = function (details) {
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return gulp.src(details.input)
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(outputs.dir));
  }
};