import View from '../core/View'
import Field from '../core/Field'
import Title from '../core/Title'
import FormWithPanel from '../core/FormWithPanel'
import ShowHidePassword from '../core/ShowHidePassword'
import SubmitButton from '../core/SubmitButton'
import UseContext from '../core/UseContext'
import logic from '../../../logic'

import './Register.css'

import { Link, useNavigate } from 'react-router-dom'
import TopBar from '../library/TopBar'
import Header from '../core/Header'


function Register() {
  const navigate = useNavigate()
  const { alert } = UseContext()

  const handleRegisterSubmit = event => {
    event.preventDefault()

    const target = event.target

    const name = target.name.value
    const surname = target.surname.value
    const email = target.email.value
    const phone = target.phone.value
    const password = target.password.value
    const repeatPassword = target.repeatPassword.value

    try {
      logic.registerUser(name, surname, email, phone, password, repeatPassword)
        .then(() => navigate('/login'))
        .catch(error => alert(error.message))
    } catch (error) {
      alert(error.message)
    }

  }

  return <div>
    <div>
      <Header>
        <TopBar></TopBar>
      </Header>
    </div>

    <View className='RegisterForm' tag='main'>

      <Title className='TitlePrincipalRegister'>Regístrate</Title>

      <FormWithPanel onSubmit={handleRegisterSubmit}>

        <Field id='name' type='text' placeholder='Nombre'></Field>

        <Field id='surname' type='text' placeholder='Apellidos'></Field>

        <Field id='email' type='email' placeholder='Email'></Field>

        <Field id='phone' type='string' placeholder='Teléfono +58'></Field>

        <ShowHidePassword id='password' type='password' placeholder='Contraseña'></ShowHidePassword>

        <ShowHidePassword id='repeatPassword' type='password' placeholder='Repetir contraseña'></ShowHidePassword>

        <SubmitButton>Regístrate</SubmitButton>

      </FormWithPanel>

      <p>¿Ya tienes cuenta?</p>

      <Link className='Link' to='/login'>Inicia sesión</Link>

    </View>
  </div >
}

export default Register