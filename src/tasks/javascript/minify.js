'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const Utils = require('../../utils.js');

module.exports = function (details) {
  gutil.log(`Starting ${details.name}...`);
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return gulp.src(details.input)
      .pipe(gulpif(details.env === 'development', sourcemaps.init()))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulpif(details.env === 'development', sourcemaps.write()))
      .on('finish', function(){ gutil.log(`Finished ${details.name}`) })
      .pipe(gulp.dest(outputs.dir));
  }
};