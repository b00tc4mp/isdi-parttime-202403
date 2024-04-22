var view = new Component(document.body)
view.addClass('View')
var loginForm = new LoginForm()
view.add(loginForm)

loginForm.onSubmit(function (event) {
  var userName = loginForm.getUsername()
  var password = loginForm.getPassword()
  console.log(userName, password)
  if (userName === '' || password === '') {
    event.preventDefault()
    alert('debes completar todos los campos')
  } else {
    event.preventDefault()
    var users = localStorage.users ? JSON.parse(localStorage.users) : []
    var newUser = { username: userName }
    console.log(users)
    for (var i = 0; i < users.length; i++) {
      var user = users[i]
      if (user.username === userName) {
        if (user.password === password) {
          localStorage.newUser = JSON.stringify(newUser)
          window.location.href = '../home/index.html'
          return
        } else {
          alert('contraseña incorrecta')
          return
        }
      }
    }
    alert(
      'usuario no existe debe registrarse, será redirigido a la página de registro'
    )
    window.location.href = '../register/index.html'
  }
})

var link = new Link()
link.setUrl('../register/index.html')
link.setTarget('_blank')
link.setText('Register')
view.add(link)
