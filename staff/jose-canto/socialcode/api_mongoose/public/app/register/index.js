if (logic.isUserLoggedIn())
  location.href = '../home'


const view = new Component(document.body)
view.addClass("View")

const headerRegister = new Header(1)
headerRegister.addClass("HeaderLoginRegister")

headerRegister.setText("REGISTER")
headerRegister.onClick(event => {
  event.preventDefault()
  alert("Click en el registro")
})

const registerForm = new RegisterComponent()

registerForm.onRegisterSubmitted(() => {
  setTimeout(() => location.href = '../login', 1000)
})

const loginLink = new Link()
loginLink.setText("Login")
// loginLink.setTarget("_blank")

loginLink.onClick(event => {
  event.preventDefault()
  console.log("...en espera de 1 segundo ⌛")
  setTimeout(() => {
    location.href = "../login"
  }, 1000)
})

view.add(headerRegister)
view.add(registerForm)
view.add(loginLink)
