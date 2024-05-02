var body = new Component(document.body);

var container = new Div();
container.addClass("container");

var title = new Heading(1);
title.setText("Register");
title.addClass("heading");

var registerForm = new RegisterForm();
registerForm.onSubmit(function (event) {
  event.preventDefault();

  var email = registerForm.getEmail();
  var username = registerForm.getUsername();
  var password = registerForm.getPassword();
  var repeatedPassword = registerForm.getRepeatedPassword();

  logic.registerUser(email, username, password, repeatedPassword);
});

var loginLink = new Link();
loginLink.setText("Login");
loginLink.setUrl("../login");

body.add(container);
container.add(title);
container.add(registerForm);
body.add(loginLink);
