var loginForm = new LoginForm()
document.body.appendChild(loginForm.container)

loginForm.onSubmit(function (event) {
  event.preventDefault()
  var userName = loginForm.getUsername()
  var password = loginForm.getPassword()
  var users = JSON.parse(localStorage.users)
  var newUser = { username: userName }
  console.log(users)
  for (var i = 0; i < users.length; i++) {
    var user = users[i]
    if (user.username === userName) {
      if (user.password === password) {
        localStorage.newUser = JSON.stringify(newUser)
        window.location.href = '../home/index.html'
      } else {
        alert('contraseña incorrecta')
      }
    } else {
      alert('este usuario no existe, debe registrarse')
    }
  }
})

var link = new Link()
link.setUrl('../register/index.html')
link.setTarget('_blank')
link.setText('Register')
document.body.appendChild(link.container)
