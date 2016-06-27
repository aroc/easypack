'use strict';

const path = require('path');
const gutil = require('gulp-util');
const connect = require('gulp-connect');
var Utils = require('../../utils.js');

module.exports = function (details) { 
  gutil.log(`Starting ${details.name}...`);
  
  return function () {
    return connect.server({
      root: details.paths.map(p => path.resolve(p)),
      port: details.port || 8080
    });
  }
};