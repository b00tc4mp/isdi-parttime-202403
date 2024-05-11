const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{6,}$/

const logic = {}
//logic RegisterForm
logic.registerUser = (
  name,
  surname,
  email,
  username,
  password,
  repeatPassword
) => {
  if (!USERNAME_REGEX.test(name)) throw new ContentError('nombre no válido')
  if (!USERNAME_REGEX.test(surname)) throw new ContentError('surname no válido')

  if (!EMAIL_REGEX.test(email))
    throw new ContentError('Esta cuenta de correo no es correcta')

  if (!USERNAME_REGEX.test(username))
    throw new ContentError('nombre de usuario no válido')

  if (!PASSWORD_REGEX.test(password))
    throw new ContentError('La contraseña no cumple los criterios')

  if (password !== repeatPassword)
    throw new MatchError('los campos de contraseña no coinciden')

  const newUser = {
    name: name,
    surname: surname,
    email: email,
    username: username,
    password: password,
  }

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
      sessionStorage.username = username
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

logic.isUserLoggedIn = () => {
  return !!sessionStorage.username
}

logic.logoutUser = () => {
  delete sessionStorage.username
}

logic.getUserName = () => {
  var user = data.findUser((user) => {
    return user.username === sessionStorage.username
  })

  return user.username
}

logic.getAllPosts = () => {
  const posts = data.findPosts((post) => {
    return true
  })
  return posts
}

logic.createPost = (title, image, description) => {
  if (typeof title !== 'string' || !title.length) {
    throw new ContentError('Título no válido')
  }
  if (typeof image !== 'string' || !image.startsWith('http')) {
    throw new ContentError('Imagen no válida')
  }
  if (typeof description !== 'string' || !description.length) {
    throw new ContentError('descripción no válida')
  }
  const post = {
    author: sessionStorage.username,
    title: title,
    image: image,
    description: description,
    date: new Date().toISOString(),
  }
  data.insertPost(post)
}

logic.getLoggedInUsername = () => sessionStorage.username

logic.deletePost = (id) => {
  // Utiliza data.deletePost para eliminar el post del almacenamiento de datos
  data.deletePost((post) => {
    return post.id === id
  })
}
