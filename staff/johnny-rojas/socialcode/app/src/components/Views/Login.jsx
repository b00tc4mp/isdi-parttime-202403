import logic from '../../logic'
import Field from '../core/Field'
import SubmitButton from '../core/SubmitButton'
import FormWithFeedback from '../library/FormWithFeedback'
import ShowPassword from '../core/ShowPasswordField'
import Link from '../core/Link'
import Title from '../core/Title'
import View from '../library/View'
import MyIcon from '../../../public/SocialCode.svg'

function Login({ onUserLoggedIn, onRegisterLinkClick }) {

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

        onUserLoggedIn()
      })
    } catch (error) {
      console.log(error)

      alert(error.message)
    }
  }

  const handleRegisterClick = event => {
    event.preventDefault()

    onRegisterLinkClick()
  }

  return <View tag="main">

    <img className="LogoLogin" src={MyIcon} alt="SocialCodeLogo"></img>

    <Title className='TitlePrincipal'>Login</Title>

    <FormWithFeedback className="Form FormWithFeedback" onSubmit={handleLoginSubmit}>

      <Field id='username' type='text' placeholder='Username'></Field>

      <ShowPassword className="Field" id="password" placeholder="Password"></ShowPassword>

      <SubmitButton>Login</SubmitButton>
    </FormWithFeedback>


    <Link onClick={handleRegisterClick} className='anchorLink'>Register</Link>

  </View>
}


export default Login