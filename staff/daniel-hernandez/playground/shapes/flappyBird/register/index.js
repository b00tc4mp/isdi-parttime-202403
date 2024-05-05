const body = new Component(document.body);

const container = new Div();
container.addClass("container");

const title = new Heading(1);
title.setText("Register");
title.addClass("heading");

const registerForm = new RegisterForm();
registerForm.onSubmit((event) => {
  event.preventDefault();

  const email = registerForm.getEmail();
  const username = registerForm.getUsername();
  const password = registerForm.getPassword();
  const repeatedPassword = registerForm.getRepeatedPassword();

  logic.registerUser(email, username, password, repeatedPassword);
});

const loginLink = new Link();
loginLink.setText("Login");
loginLink.setUrl("../login");

body.add(container);
container.add(title);
container.add(registerForm);
body.add(loginLink);
