const data = {}

data.findUser = (callback) => {
  // Obtenemos los usuarios del Local Storage o creamos un array vacío si no existen
  let usersJson = localStorage.users

  if (!usersJson) { usersJson = "[]" }

  // Convertimos la cadena JSON de usuarios a un array de objetos
  const usersArray = JSON.parse(usersJson)

  const userRegistered = usersArray.find(callback)

  return userRegistered
}

data.insertUser = (user) => {
  // Obtenemos los usuarios del Local Storage o creamos un array vacío si no existen
  let usersJson = localStorage.users

  if (!usersJson) { usersJson = "[]" }

  // Convertimos la cadena JSON de usuarios a un array de objetos
  const usersArray = JSON.parse(usersJson)

  usersArray.push(user)

  // Convertimos el array de usuarios de nuevo a una cadena JSON
  usersJson = JSON.stringify(usersArray)

  // Guardamos la cadena JSON actualizada en el Local Storage
  localStorage.users = usersJson
}

data.findPosts = (callback) => {
  let postsJson = localStorage.posts

  if (!postsJson)
    postsJson = "[]"

  const posts = JSON.parse(postsJson)

  const filtered = posts.filter(callback)

  return filtered
}

data.insertPost = (post) => {

  let postsJson = localStorage.posts

  if (!postsJson) {
    postsJson = "[]"
  }

  const posts = JSON.parse(postsJson)

  post.id = `${Math.random().toString().slice(2)}-${Date.now()}`

  posts.push(post)

  postsJson = JSON.stringify(posts)

  localStorage.posts = postsJson
}

data.deletePost = callback => {
  let postsJson = localStorage.posts

  if (!postsJson) postsJson = "[]"

  const posts = JSON.parse(postsJson)

  const index = posts.findIndex(callback)

  if (index > -1) {
    posts.splice(index, 1)

    postsJson = JSON.stringify(posts)

    localStorage.posts = postsJson
  }
}