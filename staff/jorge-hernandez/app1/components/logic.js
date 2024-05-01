const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{6,}$/

const logic = {}
//logic RegisterForm
logic.registerUser = (email, username, password, repeatPassword) => {
  if (!EMAIL_REGEX.test(email))
    throw new ContentError('Esta cuenta de correo no es correcta')

  if (!USERNAME_REGEX.test(username))
    throw new ContentError('nombre de usuario no válido')

  if (!PASSWORD_REGEX.test(password))
    throw new ContentError('La contraseña no cumple los criterios')

  if (password !== repeatPassword)
    throw new MatchError('los campos de contraseña no coinciden')

  const newUser = { email: email, username: username, password: password }

  const user = data.findUser((user) => {
    return user.email === email || user.username === username
  })

  if (user) {
    throw new DuplicityError(
      'este email o nombre de usuario ya ha sido registrado anteriormente'
    )
  }

  data.insertUser(newUser)
}
//Logic Login

logic.loginUser = (username, password) => {
  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError('username no válido')
  }
  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError('password no válido')
  }
  const newUser = { username: username }
  const user = data.findUser((user) => {
    return user.username === username
  })

  if (user) {
    if (user.password === password) {
      data.loginUser(newUser)
      window.location.href = '../home/index.html'
    } else {
      throw new ContentError('password incorrecto')
    }
  } else {
    alert('Usuario no existe. Serás redirigido a la página de registro.')
    window.location.href = '../register/index.html'
  }
}

// show pass on click
const showPass = (icon, field, type1, type2) => {
  if (field.type === type1) {
    field.type = type2
    icon.classList.add('fa-eye')
    icon.classList.remove('fa-eye-slash')
  } else if (field.type === type2) {
    field.type = type1
    icon.classList.add('fa-eye-slash')
    icon.classList.remove('fa-eye')
  }
}
