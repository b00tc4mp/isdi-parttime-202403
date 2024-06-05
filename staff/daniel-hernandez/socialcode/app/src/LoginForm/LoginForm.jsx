import React, { useEffect, useRef, useState, useContext } from "react";
import styles from "./LoginForm.module.css";
import logic from "../logic";
import ViewContext from "../ViewContext.jsx";

function LoginForm() {
  const { setView } = useContext(ViewContext);
  const formRef = useRef(null);
  const [shake, setShake] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (logic.isUserLoggedIn()) {
      setView("home");
    }
  }, [setView]);

  const handleClick = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const username = form.username.value;
    const password = form.password.value;

    try {
      logic.loginUser(username, password, (error) => {
        if (error) {
          setShake(true);
          setTimeout(() => setShake(false), 400);
          return;
        }

        setSuccessMessage("Logged in successfully");
        setTimeout(() => {
          setSuccessMessage("");
          setView("home");
        }, 1000);
      });
    } catch (error) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.heading}>Login</h1>
        <form className={styles.loginForm} ref={formRef}>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              className={styles.input}
              id="username"
              name="username"
              type="text"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              className={styles.input}
              id="password"
              name="password"
              type="password"
            />
          </div>
          <button
            className={`${styles.submitButton} ${shake ? styles.error : ""}`}
            type="submit"
            onClick={handleClick}
          >
            Login
          </button>
        </form>
        {successMessage && (
          <div className={styles.success}>{successMessage}</div>
        )}
      </div>
      <a
        className={styles.link}
        href=""
        onClick={(e) => {
          e.preventDefault();
          setView("register");
        }}
      >
        Register
      </a>
    </>
  );
}

export default LoginForm;
