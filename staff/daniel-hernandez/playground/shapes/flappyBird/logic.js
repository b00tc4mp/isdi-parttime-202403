var logic = {};

var EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/;

logic.registerUser = function (email, username, password, repeatedPassword) {
  //TODO input validation

  // check if all fields are full
  if (!email || !username || !password || !repeatedPassword) {
    registerForm.shakeButton();
    registerForm.warnAll("All fields are required");

    return;
  }

  // username regex
  if (!USERNAME_REGEX.test(username)) {
    registerForm.shakeButton();
    registerForm.warnAll("Username is not valid");

    return;
  }

  // password regex
  if (!PASSWORD_REGEX.test(password)) {
    registerForm.shakeButton();
    registerForm.warnAll("Password is not valid");

    return;
  }

  // check password length
  if (password.length < 8) {
    registerForm.shakeButton();
    registerForm.warnAll("Password should be at least 8 characters long");

    return;
  }

  // check if passwords match
  if (password !== repeatedPassword) {
    registerForm.shakeButton();
    registerForm.warnAll("Passwords do not match");

    return;
  }

  // email regex
  if (!EMAIL_REGEX.test(email)) {
    registerForm.shakeButton();
    registerForm.warnAll("Email is not valid");

    return;
  }

  // generate userkey
  var userKey = "user_" + username.toLowerCase();
  var userKeyString = JSON.stringify(userKey);

  // check if user exists
  if (localStorage.getItem(userKeyString)) {
    registerForm.shakeButton();
    registerForm.warnAll("Username already exists");

    return;
  }

  //TODO hash passwords

  var userData = {
    email: email,
    username: username,
    password: password,
  };

  localStorage.setItem(userKeyString, JSON.stringify(userData));
  registerForm.success("Registered succesfully, thank you");
  registerForm.clear();
};
