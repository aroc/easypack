function App(name) {
  this.user = new User(name);
}

App.prototype.talk = function() {
  console.log('Hi ' + this.user.name + '!');
}

window.App = App;