const logic = {}

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/
const PASSWORD_REGEX = /^[a-zA-Z0-9-_$%&=\[\]\{\}\<\>\(\)]{4,}$/

const NAME_REGEX = /^[a-zA-Z=\[\]\{\}\<\>\(\)]{1,}$/

logic.registerUser = (name, surname, email, username, password, passwordRepeat) => {
  if (!NAME_REGEX.test(name))
    throw new ContentError('❌ name is not valid ❌')

  if (!NAME_REGEX.test(surname))
    throw new ContentError('❌ surname is not valid ❌')

  if (!EMAIL_REGEX.test(email)) {
    throw new ContentError("❌ Email is not valid ❌")
  }

  if (!USERNAME_REGEX.test(username)) {
    throw new ContentError("❌ Username is not valid ❌")
  }

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }

  if (password !== passwordRepeat) {
    throw new MatchError("❌ Password don't match ❌")
  }

  let userRegistered = data.findUser((user) => {
    return user.email === email || user.username === username
  })

  if (userRegistered) {
    throw new DuplicityError("❌ Users already exists ❌")
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
    throw new ContentError("❌ Username is not valid ❌")
  } // Comprobamos si el usuario introduce correctamente los caracteres para no cargar con peticiones al servidor

  if (!PASSWORD_REGEX.test(password)) {
    throw new ContentError("❌ Password is not valid ❌")
  }

  let userFound = data.findUser((user) => user.username === username)

  if (!userFound) {
    //alert("❌Login incorrecto ❌")
    throw new MatchError("❌ User not found ❌")
  }
  if (userFound.password !== password) {
    throw new MatchError("❌ Wrong password ❌")
  }
  sessionStorage.username = username
}

logic.isUserLoggedIn = () => {
  // if (sessionStorage.username)
  //     return true

  // return false

  // return sessionStorage.username ? true : false

  return !!sessionStorage.username
}

logic.logetUser = () => {
  delete sessionStorage.username
}

logic.getName = () => {
  let user = data.findUser((user) => {
    return user.username === sessionStorage.username
  })

  return user.name
}

logic.getUserName = () => {
  let user = data.findUser((user) => {
    return user.username === sessionStorage.username
  })

  return user.username
}

logic.logoutUser = () => {
  delete sessionStorage.username
}

logic.getAllPosts = () => {

  const posts = data.findPosts(() => {
    return true
  })

  return posts.reverse()
}

logic.posts = () => {
  posts.forEach((post) => {
    const postComponent = new Post(post)

    postList.add(postComponent)
  })
}



logic.createPost = (title, image, description) => {
  if (typeof title !== "string" || !title.length || title.length > 50) {
    throw new ContentError("Title is not valid")
  }

  if (typeof image !== "string" || !image.startsWith("http")) {
    throw new ContentError("Image is not valid")
  }

  if (typeof description !== "string" || !description.length || description.length > 200) {
    throw new ContentError("Description is not valid")
  }


  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1; // Agregamos 1 porque los meses van de 0 a 11
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const post = {
    author: sessionStorage.username,
    title: title,
    image: image,
    description: description,
    // Formateamos la fecha en el formato deseado (por ejemplo, DD/MM/AAAA HH:MM)
    date: `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString()} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  };

  data.insertPost(post)
}

logic.statusButton = () => {
  let statusButton = true

  addPostButton.onClick(event => {
    event.preventDefault()

    statusButton = !statusButton
    if (!statusButton) {
      main.add(createPostForm)
      window.scrollTo(0, document.body.scrollHeight);

    } else if (statusButton)
      main.remove(createPostForm)
  })
}
