var EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
var USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
var PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{6,}$/

var logic = {}

logic.registerUser = function (email, username, password, repeatPassword) {
  if (!EMAIL_REGEX.test(email))
    throw new Error('Esta cuenta de correo no es correcta')

  if (!USERNAME_REGEX.test(username))
    throw new Error('nombre de usuario no válido')

  if (!PASSWORD_REGEX.test(password))
    throw new Error('La contraseña no cumple los criterios')

  if (password !== repeatPassword)
    throw new Error('los campos de contraseña no coinciden')

  var users = localStorage.users ? JSON.parse(localStorage.users) : []
  var newUser = { email: email, username: username, password: password }
  var existingUser = users.find(function (user) {
    return user.email === newUser.email || user.username === newUser.username
  })
  if (existingUser) {
    throw new Error(
      'este email o nombre de usuario ya ha sido registrado anteriormente'
    )
  }
  users.push(newUser)
  localStorage.users = JSON.stringify(users)
  localStorage.newUser = JSON.stringify(newUser)
  window.location.href = '../home/index.html'
  // registerForm.clear()
}
