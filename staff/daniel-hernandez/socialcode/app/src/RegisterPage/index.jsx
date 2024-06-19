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

function RegisterPage() {
  const { setView } = useContext(ViewContext);
  const [shake, setShake] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [warnMessage, setWarnMessage] = useState("");

  const handleShake = () => {
    if (isShaking) return;
    setShake(true);
    setIsShaking(true);

    setTimeout(() => {
      setShake(false);
    }, 400);
    setTimeout(() => {
      setIsShaking(false);
      setWarnMessage("");
    }, 1000);
  };

  const handleSubmit = (e) => {
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
      logic.registerUser(
        name,
        surname,
        email,
        username,
        password,
        repeatedPassword,
        (error) => {
          if (error) {
            setWarnMessage(`${error.message}`);
            handleShake();

            return;
          }

          setSuccessMessage("Registered successfully, thank you!");
          setTimeout(() => {
            setSuccessMessage("");
            setView("login");
          }, 1000);
        },
      );
    } catch (error) {
      setWarnMessage(`${error.message}`);
      handleShake();
    }
  };

  return (
    <>
      <Container className={styles.container}>
        <Title className={styles.title}>Register</Title>
        <FeedbackForm
          formClassName={styles.registerForm}
          level="both"
          onSubmit={handleSubmit}
          successClassName={styles.success}
          successMessage={successMessage}
          errorClassName={styles.warn}
          errorMessage={warnMessage}
        >
          <Field
            fieldClassName={styles.field}
            inputClassName={styles.input}
            id="name"
            type="text"
          >
            Name
          </Field>
          <Field
            fieldClassName={styles.field}
            inputClassName={styles.input}
            id="surname"
            type="text"
          >
            Surname
          </Field>
          <Field
            fieldClassName={styles.field}
            inputClassName={styles.input}
            id="email"
            type="email"
          >
            Email
          </Field>
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
          <Field
            fieldClassName={styles.field}
            inputClassName={styles.input}
            id="repeatedPassword"
            type="password"
          >
            Confirm Password
          </Field>
          <SubmitButton
            className={`${styles.submitButton} ${shake ? styles.shake : ""}`}
          >
            Register
          </SubmitButton>
        </FeedbackForm>
      </Container>
      <Link
        className={styles.link}
        onClick={(e) => {
          e.preventDefault();
          setView("login");
        }}
      >
        Login
      </Link>
    </>
  );
}

export default RegisterPage;
