if (logic.isUserLoggedIn()) {
  location.href = "../public/src";
}

const body = new Component(document.body);

const container = new Div();
container.addClass("container");

const title = new Heading(1);
title.setText("Register");
title.addClass("heading");

const registerForm = new RegisterForm();
registerForm.onRegistered(() => {
  setTimeout(() => {
    location.href = "../login";
  }, 1000);
});

const loginLink = new Link();
loginLink.setText("Login");
loginLink.setUrl("../login");

body.add(container);
container.add(title);
container.add(registerForm);
body.add(loginLink);
