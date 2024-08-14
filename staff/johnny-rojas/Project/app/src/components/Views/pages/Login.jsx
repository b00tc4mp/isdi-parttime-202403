import View from '../core/View'
import Title from '../core/Title'
import FormWithPanel from '../core/FormWithPanel'
import Field from '../core/Field'
import ShowHidePassword from '../core/ShowHidePassword'
import SubmitButton from '../core/SubmitButton'
import TopBar from '../library/TopBar'
import Header from '../core/Header'

import logic from '../../../logic'

import './Login.css'

import { Link, useNavigate } from 'react-router-dom'


function Login() {
  const navigate = useNavigate()

  const handlerLoginSubmit = event => {
    event.preventDefault()

    const target = event.target

    const email = target.email.value
    const password = target.password.value

    try {
      logic.loginUser(email, password)
        .then(() => navigate('/'))
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
    <View className='LoginForm' tag='main'>

      <Title className='TitlePrincipalLogin'>Inicia sesión</Title>

      <FormWithPanel className="LoginForm" onSubmit={handlerLoginSubmit}>

        <Field id='email' type='email' placeholder='Email'></Field>

        <ShowHidePassword id='password' type='password' placeholder='Contraseña'></ShowHidePassword>

        <SubmitButton>Inicia sesión</SubmitButton>

      </FormWithPanel>

      <p>¿No tienes cuenta?</p>

      <Link className='Link' to='/register'>Regístrate</Link>
    </View>
  </div>
}

export default Login