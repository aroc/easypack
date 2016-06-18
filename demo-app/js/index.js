var User = require('./user.js');

function App(name) {
  this.user = new User(name);
}

App.prototype.talk = function() {
  console.log('Hi ' + this.user.name + '!');
}

module.exports = App;
window.App = App;