var registerForm = new RegisterForm()
document.body.appendChild(registerForm.container)
registerForm.onSubmit(function (event) {
  var email = registerForm.getEmail()
  var username = registerForm.getUsername()
  var password = registerForm.getPassword()
  var repeatPassword = registerForm.getRepeatPassword()
  var users = localStorage.users ? JSON.parse(localStorage.users) : []
  var newUser = { email: email, username: username, password: password }

  if (password === repeatPassword) {
    for (var i = 0; i < users.length; i++) {
      var user = users[i].email
      if (user === newUser.email) {
        event.preventDefault()
        alert('este email ya ha sido registrado anteriormente')
        return
      }
    }
    event.preventDefault()
    users.push(newUser)
    localStorage.users = JSON.stringify(users)
    localStorage.newUser = JSON.stringify(newUser)
    window.location.href = '../home/index.html'
    // registerForm.clear()
  } else {
    event.preventDefault()
    alert('Las contraseñas no coinciden')
  }
})

var link = new Link()
link.setUrl('../login/index.html')
link.setTarget('_blank')
link.setText('Login')
document.body.appendChild(link.container)
