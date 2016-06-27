#! /usr/bin/env node

var fs = require('fs');
var path = require('path');
var Utils = require('../src/utils.js');
var rootPath;
if (__dirname.match('node_modules') !== null) {
  rootPath = path.resolve('./../../../');
} else {
  rootPath = path.resolve('./');
}
var easypackPath = path.resolve(rootPath, './easypack.json');

fs.stat(easypackPath, function (err, stats) {
  if (err) console.error('No easypack.json file found.');
  if (!err) {
    var EasyPack = require('../src/index.js');
    EasyPack(require(easypackPath)).run();
  }
});