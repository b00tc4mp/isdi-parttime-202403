if (logic.isUserLoggedIn())
    location.href = '../home';

const view = new Component(document.body)
view.addClass('View');

const title = new Heading(1);
title.setText('Register');

const registerForm = new RegisterForm;
registerForm.onSubmit(event => {
    event.preventDefault();

    const name = registerForm.getName();
    const surname = registerForm.getSurname();
    const email = registerForm.getEmail();
    const username = registerForm.getUsername();
    const password = registerForm.getPassword();
    const passwordRepeat = registerForm.getPasswordRepeat();

    try {
        logic.registerUser(name, surname, email, username, password, passwordRepeat);
        logic.loginUser(username, password);
        registerForm.clear();
        location.href = '../home';
    } catch (error) {
        if (error instanceof ContentError)
            registerForm.setFeedback(error.message + ', please, correct it');
        else if (error instanceof MatchError)
            registerForm.setFeedback(error.message + ', please, retype them');
        else if (error instanceof DuplicityError)
            registerForm.setFeedback(error.message + ', please, enter new one');
        else
            registerForm.setFeedback('sorry, there was an error, please try again later');
    }
})

const loginLink = new Link;
loginLink.setText('Login');
loginLink.setUrl('../login');

view.add(title);
view.add(registerForm);
view.add(loginLink);