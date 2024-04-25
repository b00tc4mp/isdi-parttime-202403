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
        dataAbsent = DataAbsent('name')
    }

    var email = registerForm.getMail()
    if(email === ''){
        
        dataAbsent = DataAbsent('email')
}

    var username = registerForm.getUserName()
    if(!username){
        
        dataAbsent = DataAbsent('username')
    }

    var password = registerForm.getPassword()
    if(!password){
        dataAbsent = DataAbsent('password')
    }

    var confirmPassword = registerForm.getConfirmPassword()
    if(!confirmPassword){
        dataAbsent = DataAbsent('Confirm Password')
    }

    if(password === confirmPassword && dataAbsent === false){
        var usersJson =  localStorage.users

        if(!usersJson){
            usersJson = '[]'
        }

        var users = JSON.parse(usersJson)

        var user = users.find(function(user){
            return (user.username === username || user.email === email)
        })
        if(user){
            alert('this user is already loged')
            return
        }
         user = {
            name: name,
            email: email,
            username: username,
            password: password
        }


        
    
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


