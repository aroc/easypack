'use strict';

const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const Utils = require('../../utils/index.js');

const babelConfig = {
  "presets": [
    "es2015",
    "react"
  ]
};

module.exports = function (details) {
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return browserify({
        entries: details.entry,
        debug: details.debug
      })
      .transform('babelify', babelConfig)
      .bundle()
      .on('error', gutil.log)
      .pipe(source(outputs.filename))
      .pipe(buffer())
      .pipe(gulpif(details.env === 'development', sourcemaps.init()))
      .pipe(gulpif(details.env === 'development', sourcemaps.write()))
      .pipe(gulp.dest(outputs.dir));
  }
};