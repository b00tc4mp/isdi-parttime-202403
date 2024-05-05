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

registerForm.onSubmit(event => {
  event.preventDefault()

  const name = registerForm.getName()
  const surname = registerForm.getSurname()
  const email = registerForm.getEmail()
  const username = registerForm.getUsername()
  const password = registerForm.getPassword()
  const passwordRepeat = registerForm.getPasswordRepeat()

  try {
    logic.registerUser(name, surname, email, username, password, passwordRepeat)

    registerForm.clear()

    setTimeout(() => location.href = '../login', 1000)

  } catch (error) {
    if (error instanceof ContentError) {

      registerForm.setFeedback(error.message + ", correct it ❌")

    } else if (error instanceof MatchError) {
      registerForm.setFeedback(error.message + ", please, retype them ❌")

    } else if (error instanceof DuplicityError) {
      registerForm.setFeedback(error.message + ", enter new one ❌")

    } else {
      registerForm.setFeedback("❌ Sorry, ther was an error, please try again later ❌")
    }
    //setTimeout(() => registerForm.clearFeedback(), 2000)
  }
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
