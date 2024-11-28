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

function RegisterPage() {
   const navigate = useNavigate();
   const [shake, setShake] = useState(false);
   const [isShaking, setIsShaking] = useState(false);
   const [successMessage, setSuccessMessage] = useState('');
   const [warnMessage, setWarnMessage] = useState('');

   const handleShake = () => {
      if (isShaking) return;
      setShake(true);
      setIsShaking(true);

      setTimeout(() => {
         setShake(false);
      }, 400);
      setTimeout(() => {
         setIsShaking(false);
         setWarnMessage('');
      }, 1000);
   };

   const handleSubmit = async e => {
      e.preventDefault();

      if (isShaking) return;

      const form = e.target;

      const name = form.name.value;
      const surname = form.surname.value;
      const email = form.email.value;
      const username = form.username.value;
      const password = form.password.value;
      const repeatedPassword = form.repeatedPassword.value;

      try {
         await logic.registerUser(name, surname, email, username, password, repeatedPassword);
         setSuccessMessage('Registered successfully, thank you!');
         setTimeout(() => {
            setSuccessMessage('');
            navigate('/login');
         }, 1000);
      } catch (error) {
         setWarnMessage(`${error.message}`);
         handleShake();
      }
   };

   return (
      <Container className="flexCol">
         <Container className="registerContainer">
            <Title className="registerTitle">Register</Title>
            <FeedbackForm
               formClassName="registerForm"
               level="both"
               onSubmit={handleSubmit}
               successClassName="registerSuccess"
               successMessage={successMessage}
               errorClassName="registerWarn"
               errorMessage={warnMessage}
            >
               <Field fieldClassName="registerField" inputClassName="registerInput" id="name" type="text">
                  Name
               </Field>
               <Field fieldClassName="registerField" inputClassName="registerInput" id="surname" type="text">
                  Surname
               </Field>
               <Field fieldClassName="registerField" inputClassName="registerInput" id="email" type="email">
                  Email
               </Field>
               <Field fieldClassName="registerField" inputClassName="registerInput" id="username" type="text">
                  Username
               </Field>
               <Field fieldClassName="registerField" inputClassName="registerInput" id="password" type="password">
                  Password
               </Field>
               <Field
                  fieldClassName="registerField"
                  inputClassName="registerInput"
                  id="repeatedPassword"
                  type="password"
               >
                  Confirm Password
               </Field>
               <SubmitButton className={`registerSubmitButton ${shake ? 'registerShake' : ''}`}>Register</SubmitButton>
            </FeedbackForm>
         </Container>
         <Link
            className="registerLink"
            onClick={e => {
               e.preventDefault();
               navigate('/login');
            }}
         >
            Login
         </Link>
      </Container>
   );
}

export default RegisterPage;
