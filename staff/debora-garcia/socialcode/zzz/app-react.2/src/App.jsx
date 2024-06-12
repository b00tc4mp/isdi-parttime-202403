import "./App.css"
//import { Component } from "react" se quita el component ya que no usamos clases
import logic from "./logic"
import "./components/core/Button.css"
import "./components/core/Field.css"
import "./components/core/Form.css"
import "./components/core/Image.css"
import "./components/core/Input.css"
import "./components/core/SubmitButton.css"
import "./components/library/FormWithFeedback.css"
import { useState } from "react"
// import Label from "./components/core/Label"
// import Input from "./components/core/Input"
import Field from "./components/core/Field"
import SubmitButton from "./components/core/SubmitButton"


//utilizamos compo de tipo funcion usando hooks
function App() {
  console.log("App -> virtual dom")

  const [view, setView] = useState("login")

  const handleRegisterSubmit = event => {
    event.preventDefault()

    const form = event.target
    const email = form.email.value
    const username = form.username.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value

    try {
      logic.registerUser(email, username, password, passwordRepeat, error => {
        if (error) {
          console.log(error)

          alert(error.message)

          return
        }

        setView("login")
      })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleLoginSubmit = (event) => {
    event.preventDefault()

    const form = event.target
    const username = form.username.value
    const password = form.password.value

    try {
      logic.loginUser(username, password, error => {
        if (error) {
          console.error(error.message + ", please, correct it")

          return
        }
        console.log("Log in succesful")

        setView("home")
      })

    } catch (error) {
      console.error(error)
    }
  }

  const handleLoginClick = event => {
    event.preventDefault()

    setView("login")
  }
  const handleRegisterClick = event => {
    event.preventDefault()

    setView("register")
  }
  //no usamos el this por que ya tenemos referenciada la funcion

  return <>
    {view === "register" && <main className="View">
      <h1>Register</h1>

      <form className="Form FormWithFeedback RegisterForm" onSubmit={handleRegisterSubmit}>
        <Field id="email" placeholder="koala@example.com">E-mail</Field>

        <Field id="username" placeholder="username">username</Field>

        <Field id="password" placeholder="password">Password</Field>

        <Field id="passwordRepeat" placeholder="passwordRepeat">Password repeat</Field>

        <SubmitButton>Register</SubmitButton>
      </form>

      <a href="" onClick={handleLoginClick}>Login</a>
    </main>}


    {view === "login" && <main className="View">
      <h1>Login</h1>
      <form className="Form FormWithFeedback" onSubmit={handleLoginSubmit}>

        <Field id="username" placeholder="username">username</Field>

        <Field id="password" placeholder="password">Password</Field>

        <SubmitButton>Login</SubmitButton>
      </form>

      <a href="" onClick={handleRegisterClick}>Register</a>
    </main>}

  </>
}

export default App
