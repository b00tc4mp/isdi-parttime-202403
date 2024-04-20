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
      console.log(user)
      if (user === newUser.email) {
        event.preventDefault()
        alert('este usuario ya existe')
        return
      }
    }
    event.preventDefault()
    users.push(newUser)
    localStorage.users = JSON.stringify(users)
    console.log('Nuevo usuario agregado:', email, username, password)
    localStorage.newUser = JSON.stringify(newUser)
    console.log('Redirigiendo a la página de inicio...')
    window.location.href = '../home/index.html'
    // registerForm.clear()
  } else {
    event.preventDefault()
    alert('La contraseña debe ser igual')
  }
})

var link = new Link()
link.setUrl('../login/index.html')
link.setTarget('_blank')
link.setText('Login')
document.body.appendChild(link.container)
