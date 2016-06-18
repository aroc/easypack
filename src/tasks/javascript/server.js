'use strict';

const connect = require('gulp-connect');

module.exports = function (details) {
  return function () {
    return connect.server({
      root: details.paths,
      port: details.port || 8080
    });
  }
};