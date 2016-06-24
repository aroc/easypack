'use strict';

const path = require('path');
const connect = require('gulp-connect');
var Utils = require('../../utils.js');

module.exports = function (details) {
  return function () {
    return connect.server({
      root: details.paths.map(p => path.resolve(Utils.getRootPath() + '/' + p)),
      port: details.port || 8080
    });
  }
};