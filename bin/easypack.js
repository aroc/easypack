#! /usr/bin/env node

var fs = require('fs');
var path = require('path');
var easypackPath = path.resolve(__dirname + '/../../../');

fs.stat('./easypack.json', function (err, stats) {
  if (err) console.error('No easypack.json file found.');
  if (!err) {
    var EasyPack = require('../src/index.js');
    EasyPack(require(path.resolve(easypackPath + '/easypack.json'))).run();
  }
});