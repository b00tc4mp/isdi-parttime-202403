var view = new Component(document.body)
view.addClass('View')
var loginForm = new LoginForm()
view.add(loginForm)

//onclick password
var icon = document.getElementById('icon')
var passField = document.getElementById('password')
icon.onclick = function showPass() {
  if (passField.type === 'text') {
    passField.type = 'password'

    icon.classList.remove('fa-eye-slash')

    icon.classList.add('fa-eye')
  } else if (passField.type === 'password') {
    passField.type = 'text'
    icon.classList.remove('fa-eye')
    icon.classList.add('fa-eye-slash')
  }
}

loginForm.onSubmit(function (event) {
  event.preventDefault()
  var username = loginForm.getUsername()
  var password = loginForm.getPassword()
  try {
    logic.loginUser(username, password)
  } catch (error) {
    loginForm.setFeedback(error.message)
  }
})

var link = new Link()
link.setUrl('../register/index.html')
link.setTarget('_blank')
link.setText('Register')
view.add(link)
