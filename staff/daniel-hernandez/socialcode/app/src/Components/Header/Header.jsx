import styles from "./Header.module.css";
import logic from "../../logic.js";

function Header() {
  const username = logic.getUsername();

  const handleLogout = () => {
    logic.logoutUser();
    window.location.href = "/login";
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
