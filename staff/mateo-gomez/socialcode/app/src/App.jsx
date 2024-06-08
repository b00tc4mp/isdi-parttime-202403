import './App.css'
import logic from './logic'
import Field from './components/core/Field'
import FormWithFeedback from './components/library/FormWithFeedBack'
import SubmitButton from './components/core/SubmitButton'
import './components/core/Image.css'

import { useState } from 'react'





function App() {
  console.log('App -> virtual dom')

  const [view, setView] = useState('login')


  const handleRegisterSubmit = event => {
    event.preventDefault()

    const form = event.target

    const name = form.name.value
    const surname = form.surname.value
    const email = form.email.value
    const username = form.username.value
    const password = form.password.value
    const passwordRepeat = form.passwordRepeat.value

    try {
      logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
        if (error) {
          console.log(error)

          alert(error.message)

          return
        }


        setView('login')

      })


    } catch (error) {

      console.error(error)

      alert(error.message)
    }
  }

  const handleLoginClick = event => {
    event.preventDefault()

    setView('login')
  }



  const handleLoginSubmit = event => {
    event.preventDefault()

    const form = event.target

    const username = form.username.value
    const password = form.password.value

    try {
      logic.loginUser(username, password, error => {
        if (error) {
          console.log(error)

          alert(error.message)

          return
        }


        setView('home')

      })


    } catch (error) {
      console.log(error)

      alert(error.message)
    }
  }

  const handleRegisterClick = event => {
    event.preventDefault()

    setView('register')
  }






  return <>
    {view === 'register' && <main className="View">

      <h1 className='MainTitle'>Register</h1>

      <FormWithFeedback onSubmit={handleRegisterSubmit}>
        <Field id='name' type='text' placeholder='name'>name</Field>
        <Field id='surname' type='text' placeholder='surname'>surname</Field>
        <Field id='email' type='email' placeholder='E-Mail'>E-Mail</Field>
        <Field id='username' type='text' placeholder='username'>username</Field>
        <Field id='password' type='password' placeholder='password'>password</Field>
        <Field id='passwordRepeat' type='password' placeholder='Repeat Password'>passwordRepeat</Field>

        <SubmitButton type='submit'>Register</SubmitButton>

      </FormWithFeedback>

      <a href='' onClick={handleLoginClick}>Login</a>

    </main>}


    {view === 'login' && <main className='View'>
      <h1 className='MainTitle'>Login</h1>

      <FormWithFeedback onSubmit={handleLoginSubmit}>
        <Field id='username' type='text' placeholder='username'>username</Field>
        <Field id='password' type='password' placeholder='password'>password</Field>

        <SubmitButton type='submit'>Login</SubmitButton>
      </FormWithFeedback>
      <a href='' onClick={handleRegisterClick}>Register</a>

    </main>}


    {
      view === 'home' && <main className='View'>
        <h1>Hello, Home!</h1>

      </main>
    }
  </>
}

export default App
