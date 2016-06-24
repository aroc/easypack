#! /usr/bin/env node

var fs = require('fs');
var path = require('path');
var Utils = require('../src/utils.js');

fs.stat('./easypack.json', function (err, stats) {
  if (err) console.error('No easypack.json file found.');
  if (!err) {
    var EasyPack = require('../src/index.js');
    EasyPack(require(path.resolve(Utils.getRootPath() + '/easypack.json'))).run();
  }
});