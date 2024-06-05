import React, { useState } from "react";
import LoginForm from "./LoginForm/LoginForm.jsx";
import RegisterForm from "./RegisterForm/RegisterForm.jsx";
import HomePage from "./HomePage/HomePage.jsx";
import ViewContext from "./ViewContext.jsx";

function App() {
  const [view, setView] = useState("login");

  return (
    <>
      <ViewContext.Provider value={{ view, setView }}>
        {view === "login" && <LoginForm />}
        {view === "register" && <RegisterForm />}
        {view === "home" && <HomePage />}
      </ViewContext.Provider>
    </>
  );
}

export default App;
