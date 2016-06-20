'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const Utils = require('../../utils/index.js');

module.exports = function (details) {
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return gulp.src(details.files)
      .pipe(gulpif(details.env === 'development', sourcemaps.init()))
      .pipe(concat(outputs.filename))
      .pipe(gulpif(details.env === 'development', sourcemaps.write()))
      .pipe(gulp.dest(outputs.dir));
  }
};