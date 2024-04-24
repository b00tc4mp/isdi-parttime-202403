var view = new Component(document.body)
view.addClass('View')
var registerForm = new RegisterForm()
view.add(registerForm)
registerForm.onSubmit(function (event) {
  event.preventDefault()
  var email = registerForm.getEmail()
  var username = registerForm.getUsername()
  var password = registerForm.getPassword()
  var repeatPassword = registerForm.getRepeatPassword()
  var users = localStorage.users ? JSON.parse(localStorage.users) : []
  var newUser = { email: email, username: username, password: password }
  if (
    email === '' ||
    username === '' ||
    password === '' ||
    repeatPassword === ''
  ) {
    alert('Debes completar todos los campos')
  } else {
    if (password === repeatPassword) {
      var existingUser = users.find(function (user) {
        return (
          user.email === newUser.email || user.username === newUser.username
        )
      })
      console.log(existingUser)
      if (existingUser) {
        alert(
          'este email o nombre de usuario ya ha sido registrado anteriormente'
        )
        return
      }

      // for (var i = 0; i < users.length; i++) {
      //   var user = users[i].email
      //   if (user === newUser.email) {
      //     alert('este email ya ha sido registrado anteriormente')
      //     return
      //   }
      // }
      users.push(newUser)
      localStorage.users = JSON.stringify(users)
      localStorage.newUser = JSON.stringify(newUser)
      window.location.href = '../home/index.html'
      // registerForm.clear()
    } else {
      alert('Las contraseñas no coinciden')
    }
  }
})

var link = new Link()
link.setUrl('../login/index.html')
link.setTarget('_blank')
link.setText('Login')
view.add(link)
