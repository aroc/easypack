'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const postcss_cssnext = require('postcss-cssnext');
const postcss_import = require('postcss-import');
const postcss_reporter = require('postcss-reporter');

const Utils = require('../../utils.js');

module.exports = function (details) {
  gutil.log(`Starting ${details.name}...`);
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return gulp.src(details.entry)
      .pipe(gulpif(details.env === 'development', sourcemaps.init()))
      .pipe(postcss([
        postcss_import(),
        postcss_cssnext(),
        postcss_reporter()
      ]))
      .pipe(rename(outputs.filename))
      .pipe(gulpif(details.env === 'development', sourcemaps.write()))
      .on('finish', function(){ gutil.log(`Finished ${details.name}`) })
      .pipe(gulp.dest(outputs.dir));
  }
};