import logic from '../../logic'
import Field from '../core/Field'
import SubmitButton from '../core/SubmitButton'
import FormWithFeedback from '../../components/library/FormWithFeedback'
import ShowPassword from '../core/ShowPasswordField'
import Link from '../core/Link'
import Title from '../core/Title'
import View from '../library/View'
import MyIcon from '../../../public/SocialCode.svg'

function Register({ onUserRegistered, onLoginLinkClick }) {

  const handleRegisternSubmit = event => {
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

        onUserRegistered()
      })
    } catch (error) {
      console.error(error)

      alert(error.message)
    }
  }

  const handleLoginClick = event => {
    event.preventDefault()

    onLoginLinkClick()
  }

  return < View tag="main" >
    <img className="LogoRegister" src={MyIcon} alt="SocialCodeLogo"></img>

    <Title className='TitlePrincipal'>Register</Title>

    <FormWithFeedback className="Form FormWithFeedback RegisterForm" onSubmit={handleRegisternSubmit}>

      <Field id='name' type='text' placeholder='Name'></Field>

      <Field id='surname' type='text' placeholder='Surname'></Field>

      <Field id='email' type='email' placeholder='Email'></Field>

      <Field id='username' type='text' placeholder='Username'></Field>

      <ShowPassword className="Field" id="PasswordView" placeholder="Password"></ShowPassword>

      <ShowPassword className="Field" id="PasswordView" placeholder="Repeat password"></ShowPassword>

      <SubmitButton>Register</SubmitButton>

    </FormWithFeedback>

    <Link onClick={handleLoginClick}>Login</Link>

  </View >
}

export default Register