var body = new Component(document.body);

var container = new Div();
container.addClass('container');

var title = new Heading(1);
title.setText('Login')
title.addClass('heading');

var loginForm = new LoginForm();
loginForm.onSubmit(function (event) {
    event.preventDefault();

    var username = loginForm.getUsername();
    var password = loginForm.getPassword();

    var userKey = 'user_' + username.toLowerCase();
    var userKeyString = JSON.stringify(userKey); 
    
    if(localStorage.getItem(userKeyString)) {
        var userData = JSON.parse(localStorage.getItem(userKeyString))
        if(password === userData.password){
            loginForm.success('Logged in successfully');
            setTimeout(function () {
                window.location.href = '../public/src/index.html';
            }, 1000)
        } else {
            loginForm.shakeButton();
        }
    } else {
        loginForm.shakeButton();
    }
})
var registerLink = new Link();
registerLink.setText('Register');
registerLink.setUrl('../register');

body.add(container);
container.add(title);
container.add(loginForm);
body.add(registerLink);