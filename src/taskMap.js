module.exports = {
  // JS Tasks
  "js-browserify-babelify":       require('./tasks/javascript/browserify-babelify.js'),
  "js-minify":                    require('./tasks/javascript/minify.js'),
  // CSS Tasks
  "css-postcss":                  require('./tasks/css/postcss.js'),
  "css-less":                     require('./tasks/css/less.js'),
  "css-minify":                   require('./tasks/css/minify.js'),
  // Utils
  "server":                       require('./tasks/utils/server.js'),
  // General Tasks
  "concatenate":                  require('./tasks/common/concatenate.js')
};