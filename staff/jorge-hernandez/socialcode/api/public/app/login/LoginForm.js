class LoginForm extends FormWithFeedback {
  constructor() {
    super();
    this.addClass('LoginForm');

    const heading = new Heading(1);

    heading.setText('Login');

    const userNameField = new Field('name', 'text', 'Username');

    userNameField.setPlaceholder('name');

    const passwordField = new Field('password', 'password', 'Password');

    passwordField.setPlaceholder('password');

    const icon = new Component('i');
    icon.setId('icon');

    icon.addClass('fa-regular');
    icon.addClass('fa-eye-slash');
    icon.addClass('icon');

    const button = new Button();
    button.setType('submit');
    button.setText('Login');

    this.add(heading);
    this.add(userNameField);
    this.add(passwordField);
    this.add(icon);
    this.add(button);

    this.onSubmit(event => {
      event.preventDefault();

      const username = this.getUsername();
      const password = this.getPassword();

      try {
        logic.loginUser(username, password, error => {
          if (error) {
            this.setFeedback(error.message + ', please, correct it');
            return;
          }

          this.clear();
          this.setFeedback('user successfully logged in', 'success');
          this.onLoggedInListener();
        });
      } catch (error) {
        if (error instanceof ContentError)
          this.setFeedback(error.message + ', please, correct it');
        else if (error instanceof MatchError)
          this.setFeedback('wrong credentials');
        else
          this.setFeedback('sorry, there was an error, please try again later');
      }
    });
  }

  getUsername() {
    const usernameField = this.children[1];
    return usernameField.getValue();
  }

  getPassword() {
    const passwordField = this.children[2];
    return passwordField.getValue();
  }

  onLoggedIn(listener) {
    this.onLoggedInListener = listener
  }
}
