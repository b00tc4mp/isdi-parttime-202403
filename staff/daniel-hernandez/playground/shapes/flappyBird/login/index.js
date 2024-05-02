var body = new Component(document.body);

var container = new Div();
container.addClass("container");

var title = new Heading(1);
title.setText("Login");
title.addClass("heading");

var loginForm = new LoginForm();
loginForm.onSubmit(function (event) {
  event.preventDefault();

  var username = loginForm.getUsername();
  var password = loginForm.getPassword();

  logic.loginUser(username, password);
});
var registerLink = new Link();
registerLink.setText("Register");
registerLink.setUrl("../register");

body.add(container);
container.add(title);
container.add(loginForm);
body.add(registerLink);
