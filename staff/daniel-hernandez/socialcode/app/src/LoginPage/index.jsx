import React, { useState, useContext } from "react";
import styles from "./index.module.css";
import logic from "../logic/index";
import ViewContext from "../ViewContext.jsx";
import Container from "../components/atomic/Container.jsx";
import Title from "../components/atomic/Title.jsx";
import FeedbackForm from "../components/FeedbackForm.jsx";
import Field from "../components/atomic/Field.jsx";
import SubmitButton from "../components/atomic/SubmitButton.jsx";
import Link from "../components/atomic/Link.jsx";

function LoginPage() {
   const { setView } = useContext(ViewContext);
   const [shake, setShake] = useState(false);
   const [isShaking, setIsShaking] = useState(false);
   const [successMessage, setSuccessMessage] = useState("");

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
         setSuccessMessage("Logged in successfully");
         setTimeout(() => {
            setSuccessMessage("");
            setView("home");
         }, 1000);
      } catch (error) {
         console.error(`error. please fix it or try again later. ${error.message}`);
         shakeButton();
         setTimeout(() => setShake(false), 400);
      }
   };

   return (
      <>
         <Container className={styles.container}>
            <Title className={styles.title}>Login</Title>
            <FeedbackForm
               formClassName={styles.loginForm}
               level="success"
               successClassName={styles.success}
               onSubmit={handleSubmit}
               successMessage={successMessage}
            >
               <Field fieldClassName={styles.field} inputClassName={styles.input} id="username" type="text">
                  Username
               </Field>
               <Field fieldClassName={styles.field} inputClassName={styles.input} id="password" type="password">
                  Password
               </Field>
               <SubmitButton className={`${styles.submitButton} ${shake ? styles.error : ""}`}>Login</SubmitButton>
            </FeedbackForm>
         </Container>
         <Link
            className={styles.link}
            onClick={e => {
               e.preventDefault();
               setView("register");
            }}
         >
            Register
         </Link>
      </>
   );
}

export default LoginPage;
