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
loginForm.onSubmit((event) => {
  event.preventDefault();

  const username = loginForm.getUsername();
  const password = loginForm.getPassword();

  try {
    logic.loginUser(username, password);

    loginForm.success("Logged in successfully");
    loginForm.clear();
    setTimeout(() => {
      window.location.href = "../public/src/";
    }, 1000);
  } catch (error) {
    if (
      error instanceof ContentError ||
      error instanceof MatchError ||
      error instanceof DuplicityError
    ) {
      loginForm.shakeButton();
    } else {
      console.error("DEV unregistered error");
      console.log("Error, please try again later");
    }
  }
});

const registerLink = new Link();
registerLink.setText("Register");
registerLink.setUrl("../register");

body.add(container);
container.add(title);
container.add(loginForm);
body.add(registerLink);
