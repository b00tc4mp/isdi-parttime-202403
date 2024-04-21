var view = new Component(document.body) 
view.addClass('View')

var title = new Heading(1)
title.setText('Register')

var registerForm = new RegisterForm

registerForm.onSubmit(function(event){
    event.preventDefault()
    var dataAbsent = false
    var name = registerForm.getName()
    if(!name){
        alert('Fill all the fields Name is empty')
        dataAbsent = true;
        location.href= '../register';
    }

    var email = registerForm.getMail()
    if(email === ''){
        alert('Fill all the fields Email is empty')
        dataAbsent = true;
        location.href= '../register';
}

    var username = registerForm.getUserName()
    if(!username){
        alert('Fill all the fields Usernname is empty')
        dataAbsent = true;
        location.href= '../register';
    }

    var password = registerForm.getPassword()
    if(!password){
        alert('Fill all the fields Password is empty')
        dataAbsent = true;
        location.href= '../register';
    }

    var confirmPassword = registerForm.getConfirmPassword()
    if(!confirmPassword){
        alert('Fill all the fields Confirm Password is empty')
        dataAbsent = true;
        location.href= '../register';
    }

    if(password === confirmPassword && dataAbsent === false){
        var username = {
            name: name,
            email: email,
            username: username,
            password: password
        }

        var usersJson =  localStorage.users

        if(!usersJson){
            usersJson = '[]'
        }

        var users = JSON.parse(usersJson)

        users.push(username)

        usersJson = JSON.stringify(users)
        
        localStorage.users = usersJson

       location.href= '../Home'

    }else if(confirmPassword !== password){
        alert('Password and the Confirm password are not the equals')
        location.href= '../register'
    }

    registerForm.clear()
})

var loginLink = new Link
loginLink.setUrl('../login')
loginLink.setText('Login')
loginLink.addClass('loginLink')

view.add(title)
view.add(registerForm)
view.add(loginLink)


