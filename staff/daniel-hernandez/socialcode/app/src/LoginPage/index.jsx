import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import logic from '../logic';
import Container from '../components/atomic/Container';
import Title from '../components/atomic/Title';
import FeedbackForm from '../components/FeedbackForm';
import Field from '../components/atomic/Field';
import SubmitButton from '../components/atomic/SubmitButton';
import Link from '../components/atomic/Link';

function LoginPage() {
   const navigate = useNavigate();
   const [shake, setShake] = useState(false);
   const [isShaking, setIsShaking] = useState(false);
   const [successMessage, setSuccessMessage] = useState('');

   const shakeButton = () => {
      if (isShaking) return;
      setShake(true);
      setIsShaking(true);

      setTimeout(() => {
         setShake(false);
         setIsShaking(false);
      }, 400);
   };

   const handleSubmit = async e => {
      e.preventDefault();

      if (isShaking) return;

      const form = e.target;
      const username = form.username.value;
      const password = form.password.value;

      try {
         await logic.loginUser(username, password);
         setSuccessMessage('Logged in successfully');
         setTimeout(() => {
            setSuccessMessage('');
            navigate('/home');
         }, 1000);
      } catch (error) {
         console.error(`error. please fix it or try again later. ${error.message}`);
         shakeButton();
         setTimeout(() => setShake(false), 400);
      }
   };

   return (
      <Container className="flexCol">
         <Container className="loginPageContainer">
            <Title className="loginTitle">Login</Title>
            <FeedbackForm
               formClassName="loginForm"
               level="success"
               successClassName="loginSuccess"
               onSubmit={handleSubmit}
               successMessage={successMessage}
            >
               <Field fieldClassName="loginField" inputClassName="loginInput" id="username" type="text">
                  Username
               </Field>
               <Field fieldClassName="loginField" inputClassName="loginInput" id="password" type="password">
                  Password
               </Field>
               <SubmitButton className={`loginSubmitButton ${shake ? 'loginError' : ''}`}>Login</SubmitButton>
            </FeedbackForm>
         </Container>
         <Link
            className="loginLink"
            onClick={e => {
               e.preventDefault();
               navigate('/register');
            }}
         >
            Register
         </Link>
      </Container>
   );
}

export default LoginPage;
