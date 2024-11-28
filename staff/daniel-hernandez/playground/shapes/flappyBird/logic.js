const logic = {};

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{8,}$/;

logic.registerUser = (email, username, password, repeatedPassword) => {
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
  const userKey = "user_" + username.toLowerCase();
  const userKeyString = JSON.stringify(userKey);

  // check if user exists
  if (localStorage.getItem(userKeyString)) {
    registerForm.shakeButton();
    registerForm.warnAll("Username already exists");

    return;
  }

  //TODO hash passwords

  const userData = {
    email: email,
    username: username,
    password: password,
  };

  localStorage.setItem(userKeyString, JSON.stringify(userData));
  registerForm.success("Registered succesfully, thank you");
  registerForm.clear();
};

logic.loginUser = (username, password) => {
  if (!USERNAME_REGEX.test(username)) {
    loginForm.shakeButton();
  }

  if (!PASSWORD_REGEX.test(password)) {
    loginForm.shakeButton();
  }

  const userKey = "user_" + username.toLowerCase();
  const userKeyString = JSON.stringify(userKey);

  if (localStorage.getItem(userKeyString)) {
    const userData = JSON.parse(localStorage.getItem(userKeyString));
    if (password === userData.password) {
      loginForm.success("Logged in successfully");
      loginForm.clear();
      sessionStorage.username = username;
      setTimeout(function () {
        window.location.href = "../public/src/index.html";
      }, 1000);
    } else {
      loginForm.shakeButton();
    }
  } else {
    loginForm.shakeButton();
  }
};

logic.isUserLoggedIn = () => {
  return !!sessionStorage.username;
};

logic.logoutUser = () => {
  delete sessionStorage.username;
};

logic.getUsername = () => {
  const username = sessionStorage.getItem("username");

  // check if username is defined correctly, if not redirect to the login page
  if (username === undefined || username === null) {
    // for debugging
    console.error("username is undefined or null");
    window.location.href = "../flappyBird/login/index.html";
  }

  return username;
};
