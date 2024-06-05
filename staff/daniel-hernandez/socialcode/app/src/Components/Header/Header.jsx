import React, { useContext } from "react";
import styles from "./Header.module.css";
import logic from "../../logic";
import ViewContext from "../../ViewContext.jsx";

function Header() {
  const { setView } = useContext(ViewContext);
  const username = logic.getUsername();

  const handleLogout = () => {
    logic.logoutUser();
    setView("login");
  };

  return (
    <div className={styles.header}>
      <p className={styles.username}>{username}</p>
      <button className={styles.logoutButton} onClick={handleLogout}>
        logout
      </button>
    </div>
  );
}

export default Header;
