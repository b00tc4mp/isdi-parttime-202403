import React, { useState } from "react";
import logic from "./logic/index";
import LoginPage from "./LoginPage/index.jsx";
import RegisterPage from "./RegisterPage/index.jsx";
import HomePage from "./HomePage/index.jsx";
import ViewContext from "./ViewContext.jsx";

function App() {
  const [view, setView] = useState(logic.isUserLoggedIn() ? "home" : "login");

  return (
    <>
      <ViewContext.Provider value={{ view, setView }}>
        {view === "login" && <LoginPage />}
        {view === "register" && <RegisterPage />}
        {view === "home" && <HomePage />}
      </ViewContext.Provider>
    </>
  );
}

export default App;
