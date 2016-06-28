'use strict';

const gulp = require('gulp');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

const Utils = require('../../utils.js');

module.exports = function (details) {
  gutil.log(`Starting ${details.name}...`);
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return browserify({
      entries: details.entry,
      debug: details.env === 'development' ? true : false
    })
    .transform('babelify', {
      presets: details.babel_presets || [],
      plugins: details.babel_plugins || []
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source(outputs.filename))
    .pipe(buffer())
    .pipe(gulpif(details.env === 'development', sourcemaps.init()))
    .pipe(gulpif(details.env === 'development', sourcemaps.write()))
    .on('finish', function(){ gutil.log(`Finished ${details.name}`) })
    .pipe(gulp.dest(outputs.dir));
  }
};