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
registerForm.onSubmit((event) => {
  event.preventDefault();

  const name = registerForm.getName();
  const surname = registerForm.getSurname();
  const email = registerForm.getEmail();
  const username = registerForm.getUsername();
  const password = registerForm.getPassword();
  const repeatedPassword = registerForm.getRepeatedPassword();

  try {
    logic.registerUser(
      name,
      surname,
      email,
      username,
      password,
      repeatedPassword,
    );

    registerForm.success("Registered succesfully, thank you");
    registerForm.clear();
    setTimeout(() => {
      location.href = "../login";
    }, 1000);
  } catch (error) {
    if (
      error instanceof ContentError ||
      error instanceof MatchError ||
      error instanceof DuplicityError
    ) {
      registerForm.shakeButton();
      registerForm.warnAll(error.message);
    } else {
      registerForm.shakeButton();
      registerForm.warnAll("Error, please try again later..");
    }
  }
});

const loginLink = new Link();
loginLink.setText("Login");
loginLink.setUrl("../login");

body.add(container);
container.add(title);
container.add(registerForm);
body.add(loginLink);
