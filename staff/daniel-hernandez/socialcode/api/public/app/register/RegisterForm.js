class RegisterForm extends Form {
  constructor() {
    super();
    this.removeClass("Form");
    this.addClass("RegisterForm");

    const nameField = new Field("name", "text", "Name");

    const surnameField = new Field("surname", "text", "Surname");

    const emailField = new Field("email", "email", "Email");

    const usernameField = new Field("username", "text", "Username");

    const passwordField = new Field("password", "password", "Password");

    const passwordConfirmField = new Field(
      "repeatedPassword",
      "password",
      "Confirm Password",
    );

    const submitButton = new SubmitButton("Register");

    this.add(nameField);
    this.add(surnameField);
    this.add(emailField);
    this.add(usernameField);
    this.add(passwordField);
    this.add(passwordConfirmField);
    this.add(submitButton);

    this.onSubmit((event) => {
      event.preventDefault();

      const name = this.getName();
      const surname = this.getSurname();
      const email = this.getEmail();
      const username = this.getUsername();
      const password = this.getPassword();
      const repeatedPassword = this.getRepeatedPassword();

      try {
        logic.registerUser(
          name,
          surname,
          email,
          username,
          password,
          repeatedPassword,
          (error) => {
            if (error) {
              registerForm.shakeButton();
              registerForm.warnAll(`${error.message}`);
              return;
            }

            registerForm.success("Registered succesfully, thank you");
            registerForm.clear();

            this.onRegisteredListener();
          },
        );
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
  }

  getName() {
    const nameField = this.children[0];
    return nameField.getValue();
  }

  getSurname() {
    const surnameField = this.children[1];
    return surnameField.getValue();
  }

  getEmail() {
    const emailField = this.children[2];
    return emailField.getValue();
  }

  getUsername() {
    const usernameField = this.children[3];

    return usernameField.getValue();
  }

  getPassword() {
    const passwordField = this.children[4];

    return passwordField.getValue();
  }

  getRepeatedPassword() {
    const repeatedPasswordField = this.children[5];

    return repeatedPasswordField.getValue();
  }

  shakeButton() {
    const button = this.children[6];

    button.removeClass("SubmitButton");
    button.addClass("error");
    setTimeout(() => {
      button.removeClass("error");
      button.addClass("SubmitButton");
    }, 400);
  }

  warnAll(message) {
    if (!this.warningDisplayed) {
      const warningMessage = new Div();
      warningMessage.addClass("warn");
      warningMessage.setText(message);

      this.add(warningMessage);

      const warningMessageElement = warningMessage.getElement();

      this.warningDisplayed = true;

      setTimeout(() => {
        warningMessageElement.parentNode.removeChild(warningMessageElement);

        this.warningDisplayed = false;
      }, 2000);
    }
  }

  success(message) {
    if (!this.successDisplayed) {
      const successMessage = new Div();
      successMessage.addClass("success");
      successMessage.setText(message);

      this.add(successMessage);

      const successMessageElement = successMessage.getElement();

      this.successDisplayed = true;

      setTimeout(() => {
        successMessageElement.parentNode.removeChild(successMessageElement);

        this.successDisplayed = false;
      }, 2000);
    }
  }

  clear() {
    Form.prototype.clear.call(this);
  }

  onRegistered(listener) {
    this.onRegisteredListener = listener;
  }
}
