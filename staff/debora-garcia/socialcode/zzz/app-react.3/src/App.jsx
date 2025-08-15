import "./App.css"
//import { Component } from "react" se quita el component ya que no usamos clases
import logic from "./logic"
import "./components/library/FormWithFeedback.css"
import { useState } from "react"
import Field from "./components/core/Field"
import SubmitButton from "./components/core/SubmitButton"
import FormWithFeedback from "./components/library/FormWithFeedback"
import Link from "./components/core/Link"
import Title from "./components/core/Title"


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
  //REGISTER
    {view === "register" && <main className="View">
      <Title>Register</Title>

      <FormWithFeedback onSubmit={handleRegisterSubmit}>
        <Field id="email" type="email" placeholder="koala@example.com">E-mail</Field>

        <Field id="username" placeholder="username">username</Field>

        <Field id="password" type="password" placeholder="password">Password</Field>

        <Field id="passwordRepeat" type="password" placeholder="passwordRepeat">Password repeat</Field>

        <SubmitButton>Register</SubmitButton>
      </FormWithFeedback>

      <Link onClick={handleLoginClick}>Login</Link>
    </main>}
//LOGIN
    {view === "login" && <main className="View">
      <Title>Login</Title>
      <FormWithFeedback onSubmit={handleLoginSubmit}>

        <Field id="username" placeholder="username">username</Field>

        <Field id="password"  placeholder="password">Password</Field>

        <SubmitButton>Login</SubmitButton>
      </FormWithFeedback>

      <Link onClick={handleRegisterClick}>Register</Link>
    </main>}

    {view === "home" && <main className="View">
      <Title>Hello, Home!</Title>
    </main>}

  </>
}

export default App
