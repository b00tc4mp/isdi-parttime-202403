const data = {}
// data registerForm
data.findUser = (callback) => {
  const users = localStorage.users ? JSON.parse(localStorage.users) : []
  const user = users.find(callback)
  return user
}
data.insertUser = (newUser) => {
  const users = localStorage.users ? JSON.parse(localStorage.users) : []

  users.push(newUser)
  localStorage.users = JSON.stringify(users)
  window.location.href = '../home/index.html'
  // registerForm.clear()
}
data.findPosts = (callback) => {
  let postsJson = localStorage.postsJson

  if (!localStorage.posts) {
    postsJson = '[]'
  } else {
    const posts = JSON.parse(localStorage.posts)
    const filtered = posts.filter(callback).reverse()
    return filtered
  }
}

data.insertPost = (post) => {
  const posts = localStorage.posts ? JSON.parse(localStorage.posts) : []

  posts.push(post)
  localStorage.posts = JSON.stringify(posts)
}
