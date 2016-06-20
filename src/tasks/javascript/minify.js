'use strict';

const gulp = require('gulp');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const Utils = require('../../utils/index.js');

module.exports = function (details) {
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return gulp.src(details.input)
      .pipe(gulpif(details.env === 'development', sourcemaps.init()))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulpif(details.env === 'development', sourcemaps.write()))
      .pipe(gulp.dest(outputs.dir));
  }
};