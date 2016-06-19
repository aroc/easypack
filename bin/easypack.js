#! /usr/bin/env node

var fs = require('fs');

fs.stat('./easypack.json', function (err, stats) {
  if (err) console.error('No easypack.json file found.');
  if (!err) {
    var EasyPack = require('../src/index.js');
    EasyPack(require('../easypack.json')).run();
  }
});