'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const Utils = require('../../utils/index.js');

module.exports = function (details) {
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return gulp.src(details.input)
      .pipe(gulpif(details.env === 'development', sourcemaps.init()))
      .pipe(cleanCSS())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulpif(details.env === 'development', sourcemaps.write()))
      .pipe(gulp.dest(outputs.dir));
  }
};