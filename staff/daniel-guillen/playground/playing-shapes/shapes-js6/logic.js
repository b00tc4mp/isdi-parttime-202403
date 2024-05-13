const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

var NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat) => {
    if (!NAME_REGEX.test(name))
      throw new ContentError('❌ Nombre no válido')
  
    if (!NAME_REGEX.test(surname))
      throw new ContentError('❌ Apellido no válido')
  
    if (!EMAIL_REGEX.test(email)) {
      throw new ContentError("❌ Correo no válido")
    }
  
    if (!USERNAME_REGEX.test(username)) {
      throw new ContentError("❌ Nombre de usuario no válido")
    }
  
    if (!PASSWORD_REGEX.test(password)) {
      throw new ContentError("❌ Contraseña no válida")
    }
  
    if (password !== passwordRepeat) {
      throw new MatchError("❌ No coincide contraseña")
    }
  
    let userRegistered = data.findUser(function (user) {
      return user.email === email || user.username === username
    })
  
    if (userRegistered) {
      throw new DuplicityError("❌ Usuario no disponible")
    }
  
    const user = {
      name: name,
      surname: surname,
      email: email,
      username: username,
      password: password,
    }
  
    data.insertUser(user)
  }
  
  logic.loginUser = (username, password) => {
  
    if (!USERNAME_REGEX.test(username)) {
      throw new ContentError("❌ Usuario no válido")
    }   
    if (!PASSWORD_REGEX.test(password)) {
      throw new ContentError("❌ Contraseña no válida")
    }
  
    let userFound = data.findUser((user) => user.username === username)
  
    if (!userFound) {
      throw new MatchError("❌ Usuario no válido")
    }
    if (userFound.password !== password) {
      throw new MatchError("❌ Contraseña no válida")
    }
    sessionStorage.username = username
  }
  
  logic.isUserLoggedIn = function () {
    return !!sessionStorage.username
  }
  
  logic.logetUser = function () {
    delete sessionStorage.username
  }
  
  logic.getUserName = function () {
    let user = data.findUser(function (user) {
      return user.username === sessionStorage.username
    })
  
    return user.name
  }
  
  logic.logoutUser = function () {
    delete sessionStorage.username
  }