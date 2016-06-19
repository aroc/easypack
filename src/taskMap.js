module.exports = {
  // JS Tasks
  "javascript modules":           require('./tasks/javascript/modules.js'),
  "minify javascript file":       require('./tasks/javascript/minify.js'),
  // CSS Tasks
  "css imports":                  require('./tasks/css/imports.js'),
  "minify css file":              require('./tasks/css/minify.js'),
  // Utils
  "server":                       require('./tasks/utils/server.js'),
  // General Tasks
  "concatenate":                  require('./tasks/common/concatenate.js')
};