var body = new Component(document.body);

var container = new Div();
container.addClass('container');

var title = new Heading(1);
title.setText('Register');
title.addClass('heading');

var registerForm = new RegisterForm();
registerForm.onSubmit(function (event) {
    event.preventDefault();
    // inside form implement a clear method
    // this.container.clear () 
    // this.container.reset();

    // to-do ~ additional validation ~ valid email format and username format
    // input validation
    // EMAIL REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // USERNAME REGEX: /^[a-zA-Z0-9-_]+$/

    // should contain special characters numbers and minimum length
    // PASWORD REGEX: 

    // 

    var email = registerForm.getEmail();
    var username = registerForm.getUsername();
    var password = registerForm.getPassword();
    var repeatedPassword = registerForm.getRepeatedPassword();

    // check if all fields are full
    if(!email || !username || !password || !repeatedPassword) { 
        registerForm.shakeButton();
        registerForm.warnAll('All fields are required');

        return;
    }

    // check if passwords match
    if(password  !== repeatedPassword) {
        registerForm.shakeButton();
        registerForm.warnAll('Passwords do not match');

        return;
    }

    // check password length
    if(password.length < 8) {
        registerForm.shakeButton();
        registerForm.warnAll('Password should be at least 8 characters long');

        return;
    }

    // to-do ~ 
    // hash passwords
    
    var userKey = 'user_' + username.toLowerCase();
    var userKeyString = JSON.stringify(userKey);

    if(localStorage.getItem(userKeyString)) {
        registerForm.shakeButton();
        registerForm.warnAll('Username already exists');
        
        return;
    }

    var userData = {
        email: email,
        username: username,
        password: password
    }

    localStorage.setItem(userKeyString, JSON.stringify(userData));
    registerForm.success('Registered succesfully, thank you');
})

var loginLink = new Link();
loginLink.setText('Login');
loginLink.setUrl('../login');

body.add(container);
container.add(title)
container.add(registerForm);
body.add(loginLink);