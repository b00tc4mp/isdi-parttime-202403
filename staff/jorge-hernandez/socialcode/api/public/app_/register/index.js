if (logic.isUserLoggedIn()) location.href = '../home'
const view = new Component(document.body)
view.addClass('View')
const registerForm = new RegisterForm()
view.add(registerForm)

//onclick password
const icon = document.getElementById('icon')
const passField = document.getElementById('password')
icon.onclick = () => {
  showPass(icon, passField, 'password', 'text')
}

const icon2 = document.getElementById('icon2')
const passField2 = document.getElementById('repeat-password')
icon2.onclick = () => {
  showPass(icon2, passField2, 'password', 'text')
}

const link = new Link()
link.setUrl('../login/index.html')
link.setTarget('_blank')
link.setText('Login')
view.add(link)
