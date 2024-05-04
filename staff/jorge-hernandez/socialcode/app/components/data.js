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
  // localStorage.newUser = JSON.stringify(newUser)
  window.location.href = '../home/index.html'
  // registerForm.clear()
}
// data loginForm

// data.loginUser = (newUser) => {
//   localStorage.newUser = JSON.stringify(newUser)
// }
