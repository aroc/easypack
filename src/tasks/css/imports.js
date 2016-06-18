'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const postcss_cssnext = require('postcss-cssnext');
const postcss_import = require('postcss-import');
const postcss_reporter = require('postcss-reporter');

const Utils = require('../../utils/index.js');

module.exports = function (details) {
  let outputs = Utils.parseOutput(details.output);

  return function () {
    return gulp.src(details.entry)
      .pipe(postcss([
        postcss_import(),
        postcss_cssnext(),
        postcss_reporter()
      ]))
      .pipe(rename(outputs.filename))
      .pipe(gulp.dest(outputs.dir));
  }
};