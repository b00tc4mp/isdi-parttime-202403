import React, { useState, useContext } from "react";
import styles from "./index.module.css";
import logic from "../logic";
import ViewContext from "../ViewContext.jsx";
import Container from "../Components/Atomic/Container.jsx";
import Title from "../Components/Atomic/Title.jsx";
import FeedbackForm from "../Components/FeedbackForm.jsx";
import Field from "../Components/Atomic/Field.jsx";
import SubmitButton from "../Components/Atomic/SubmitButton.jsx";
import Link from "../Components/Atomic/Link.jsx";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isShaking) return;

    const form = e.target;
    const username = form.username.value;
    const password = form.password.value;

    try {
      logic.loginUser(username, password, (error) => {
        if (error) {
          shakeButton();
          console.error(`error. please fix it or try again later.`);
          return;
        }

        setSuccessMessage("Logged in successfully");
        setTimeout(() => {
          setSuccessMessage("");
          setView("home");
        }, 1000);
      });
    } catch (error) {
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
          <Field
            fieldClassName={styles.field}
            inputClassName={styles.input}
            id="username"
            type="text"
          >
            Username
          </Field>
          <Field
            fieldClassName={styles.field}
            inputClassName={styles.input}
            id="password"
            type="password"
          >
            Password
          </Field>
          <SubmitButton
            className={`${styles.submitButton} ${shake ? styles.error : ""}`}
          >
            Login
          </SubmitButton>
        </FeedbackForm>
      </Container>
      <Link
        className={styles.link}
        onClick={(e) => {
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
