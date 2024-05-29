if (logic.isUserLoggedIn()) {
  location.href = "../public/src";
}

const body = new Component(document.body);

const container = new Div();
container.addClass("container");

const title = new Heading(1);
title.setText("Login");
title.addClass("heading");

const loginForm = new LoginForm();
loginForm.onLoggedIn(() => {
  setTimeout(() => {
    window.location.href = "../public/src/";
  }, 1000);
});

const registerLink = new Link();
registerLink.setText("Register");
registerLink.setUrl("../register");

body.add(container);
container.add(title);
container.add(loginForm);
body.add(registerLink);
