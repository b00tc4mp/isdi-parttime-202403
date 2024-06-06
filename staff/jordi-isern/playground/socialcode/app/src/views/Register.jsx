import { useState } from 'react'
import logic from '../logic.js'
import Field from '../Components/Core/Field.jsx'
import SubmitButton from '../Components/Core/SubmitButton.jsx'
import FormWithFeedback from './Components/Library/FormWithFeedback.jsx'
import Link from '../Components/Core/Link.jsx'
import Title from '../Components/Core/Title.jsx'
import View from '../Components/Library/View.jsx'


function Register (onUserRegistered ,onLoginLinkClick){

    const  handleRegisterSubmit = event => {
        event.preventDefault()
    
        const form = event.target
    
        const name = form.name.value
        const surname = form.surname.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value
    
        try{
          logic.registerUser(name, surname, email, username, password, passwordRepeat, error => {
            if(error) {
              console.log(error)
              
              alert(error.message)
              
              return
            }
            onUserRegistered()
          })
        }catch(error) {
          console.log(error)
    
          alert(error.message)
        }
    }
    
    const handleLoginClick = event =>{
      event.preventDefault()
    
      onLoginLinkClick()
    
    }

    return (<View tag='main'>
        <Title>Register</Title>
        <FormWithFeedback onSubmit={handleRegisterSubmit}>
          <Field id="name" placeholder="name">Name</Field>
          <Field id="email" placeholder="email">E-mail</Field>
          <Field id="password" placeholder="password" type="password">Password</Field>
          <Field id="repeatPassword" placeholder="Repeat Password" type="password"> Repeat Password</Field>
          <SubmitButton>Register</SubmitButton>
        </FormWithFeedback>
        <Link onClick={handleLoginClick}>Login</Link>
        </View>)
}

export default Register