'use strict'

module.exports = {

  parseOutput: function (output) {
    let result = {};
    let pathSplit = output.split('/');
    result.filename = pathSplit[pathSplit.length-1];
    pathSplit.pop();
    result.dir = pathSplit.join('/');
    return result;
  }

};