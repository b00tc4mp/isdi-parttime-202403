var data = {}

data.findUser = function (callback) {
  var users = localStorage.users ? JSON.parse(localStorage.users) : []
  var user = users.find(callback)
  return user
}
data.insertUser = function (newUser) {
  var users = localStorage.users ? JSON.parse(localStorage.users) : []

  users.push(newUser)
  localStorage.users = JSON.stringify(users)
  localStorage.newUser = JSON.stringify(newUser)
  window.location.href = '../home/index.html'
  // registerForm.clear()
}
