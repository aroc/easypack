module.exports = {
  // JS Tasks
  "javascript-modules":           require('./tasks/javascript/modules.js'),
  "javascript-minify":            require('./tasks/javascript/minify.js'),
  // CSS Tasks
  "css-imports":                  require('./tasks/css/imports.js'),
  "css-minify":                   require('./tasks/css/minify.js'),
  // Utils
  "server":                       require('./tasks/utils/server.js'),
  // General Tasks
  "concatenate":                  require('./tasks/common/concatenate.js')
};