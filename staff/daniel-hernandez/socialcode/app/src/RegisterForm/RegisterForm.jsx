import React, { useRef, useEffect, useState } from "react";
import styles from "./RegisterForm.module.css";
import logic from "../logic.js";

function RegisterForm() {
  const formRef = useRef(null);
  const [shake, setShake] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [warnMessage, setWarnMessage] = useState("");

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      location.href = "/HOME";
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();

    const form = formRef.current;

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
            setShake(true);
            setWarnMessage(`${error.message}`);
            setTimeout(() => {
              setShake(false);
            }, 400);
            setTimeout(() => {
              setWarnMessage("");
            }, 1000);

            return;
          }

          setSuccessMessage("Registered successfully, thank you!");
          setTimeout(() => {
            setSuccessMessage("");
            window.location.href = "/LOGIN";
          }, 1000);
        },
      );
    } catch (error) {
      setShake(true);
      setWarnMessage(`${error.message}`);
      setTimeout(() => {
        setShake(false);
      }, 400);
      setTimeout(() => {
        setWarnMessage("");
      }, 1000);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Register</h1>
        <form className={styles.registerForm} ref={formRef}>
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input className={styles.input} id="name" type="text" name="name" />
          </div>
          <div className={styles.field}>
            <label htmlFor="surname">Surname</label>
            <input
              className={styles.input}
              id="surname"
              type="text"
              name="surname"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              className={styles.input}
              id="email"
              type="email"
              name="email"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              className={styles.input}
              id="username"
              type="text"
              name="username"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              className={styles.input}
              id="password"
              type="password"
              name="password"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="repeatedPassword">Confirm Password</label>
            <input
              className={styles.input}
              id="repeatedPassword"
              type="password"
              name="repeatedPassword"
            />
          </div>
          <button
            className={`${styles.submitButton} ${shake ? styles.shake : ""}`}
            type="submit"
            onClick={handleClick}
          >
            Register
          </button>
        </form>
        {warnMessage && <div className={styles.warn}>{warnMessage}</div>}
        {successMessage && (
          <div className={styles.success}>{successMessage}</div>
        )}
      </div>
      <a className={styles.link} href="../login">
        Login
      </a>
    </>
  );
}

export default RegisterForm;
