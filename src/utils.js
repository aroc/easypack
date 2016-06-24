'use strict'

const path = require('path');

module.exports = {

  parseOutput: function (output) {
    let result = {};
    let pathSplit = output.split('/');
    result.filename = pathSplit[pathSplit.length-1];
    pathSplit.pop();
    result.dir = pathSplit.join('/');
    return result;
  },

  getFileType: function (path) {
    let splitPath = path.split('.');
    return splitPath[splitPath.length-1];
  },

  getRootPath: function () {
    let executionPath = path.resolve(__dirname, '/../../');
    let directoryName = executionPath.split('/')[executionPath.split('/').length-1];
    if (directoryName === 'node_modules') {
      return path.resolve(__dirname + '/../../../');
    }
    return path.resolve(__dirname + '/../');
  }

};