import { useState } from 'react'
import './App.css'
import Field from './components/core/Field'
import SubmitButton from './components/core/SubmitButton'
import Form from './components/core/Form'
import Link from './components/core/Link'

function App() {
  const [view, setView] = useState('login')

  const handleRegisterSubmit = event => {
    event.preventDefault()

    const form = event.target

    const username = form.username.value
    const mail = form.mail.value
    const password = form.password.value
    const passwordRepeat = form.passwordrepeat.value

    console.log({ username, mail, password, passwordRepeat })

    // try {
    //   logic.registerUser(username, mail, password, passwordRepeat, (error) => {
    //     if (error) {
    //       alert(error.message)
    //     }
    //     setView('Login')
    //   })
    // } catch (error) {
    //   alert(error.message)
    // }
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

    console.log({ username, password })

    // try {
    //   logic.loginUser(username, password, (error) => {
    //     if (error) {
    //       alert(error.message)
    //     }
    //     setView('home')
    //   })
    // } catch (error) {
    //   alert(error.message)
    // }
  }

  const handleRegisterClick = event => {
    event.preventDefault()

    setView('register')
  }


  return <>
    {view === 'register' && <main className='View'>
      <Form className={'RegisterForm'} onSubmit={handleRegisterSubmit}>
        <Field id='username' type='text' children='Username' placeholder='username' />
        <Field id='mail' type='mail' children='Email' placeholder='email' />
        <Field id='password' type='password' children='Password' placeholder='password' />
        <Field id='passwordrepeat' type='password' children='Password Repeat' placeholder='password repeat' />
        <SubmitButton children='Register' />
      </Form>
      <Link href='' onClick={handleLoginClick} children={'Have an account? Sign in'} />


    </main>
    }

    {view === 'login' && <main className='View'>
      <Form className={'LoginForm'} onSubmit={handleLoginSubmit}>
        <Field id='username' type='text' placeholder='username' children='Username' />
        <Field id='password' type='password' children='Password' placeholder='password' />
        <SubmitButton children='Login' />
      </Form>
      <Link onClick={handleRegisterClick} children={'Don\'t have an account? Sign up'} />

    </main>
    }

    {view === 'home' && <main className='View'>
      <h1>Hello, Home!</h1>
    </main>
    }
  </>
}

export default App

