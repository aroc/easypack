'use strict'

const path = require('path');
var easypackPath = path.resolve(__dirname + '/../../../');
const gulp = require('gulp');
const gutil = require('gulp-util');
const Utils = require('./utils/index.js');
const taskMap = require('./taskMap.js');
const ENV = process.env.NODE_ENV || 'development';
const pkg = require(path.resolve(easypackPath + '/package.json'));

function EasyPack(manifest) {
  if (this instanceof EasyPack === false) {
    return new EasyPack(manifest);
  }
  this.manifest = manifest;
  this.taskMap = taskMap;
  this.taskNames = [];

  for (let i=0; i < this.manifest.tasks.length; i++) {
    let details = this.manifest.tasks[i];
    details.env = ENV;
    let dependencies = [];
    this.taskNames.push(details.name);

    if (details.depends_on) {
      dependencies = (details.depends_on.constructor === Array) ? details.depends_on : [details.depends_on];
    }

    // Define the Gulp taks
    let task = null;
    if (this.taskMap[details.what]) {
      task = this.taskMap[details.what](details);
    }
    else {
      task = require(`../easypack-tasks/${details.what}.js`)(details);
    }
    gulp.task(details.name, dependencies, task);

    // Add minification task if required
    if (details.minify_after === true) this.createMinificationTask(details);

    if (details.watch_for_changes) this.createWatchTask(details);
  }
  return this;
}

EasyPack.prototype.createMinificationTask = function (details) {
  details.input = details.output;
  let taskName = `minify-${details.name}`;
  this.taskNames.push(taskName);
  let fileType = Utils.getFileType(details.output);

  if (fileType === 'js') {
    gulp.task(taskName, [details.name], this.taskMap['minify javascript file'](details));
  }
  if (fileType === 'css') {
    gulp.task(taskName, [details.name], this.taskMap['minify css file'](details));
  }
}

EasyPack.prototype.createWatchTask = function (details) {
  let files = (details.watch_for_changes.constructor === Array) ? details.watch_for_changes : [details.watch_for_changes]
  gulp.watch(files, [details.name]);
}

EasyPack.prototype.run = function() {
  gulp.task('default', this.taskNames);
  gulp.start();
};

module.exports = EasyPack;