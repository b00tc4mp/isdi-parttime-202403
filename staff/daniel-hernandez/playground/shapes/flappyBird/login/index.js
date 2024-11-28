const body = new Component(document.body);

const container = new Div();
container.addClass("container");

const title = new Heading(1);
title.setText("Login");
title.addClass("heading");

const loginForm = new LoginForm();
loginForm.onSubmit((event) => {
  event.preventDefault();

  const username = loginForm.getUsername();
  const password = loginForm.getPassword();

  logic.loginUser(username, password);
});

const registerLink = new Link();
registerLink.setText("Register");
registerLink.setUrl("../register");

body.add(container);
container.add(title);
container.add(loginForm);
body.add(registerLink);
