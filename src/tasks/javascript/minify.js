'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

const Utils = require('../../utils/index.js');

module.exports = function (details) {
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return gulp.src(details.input)
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(outputs.dir));
  }
};