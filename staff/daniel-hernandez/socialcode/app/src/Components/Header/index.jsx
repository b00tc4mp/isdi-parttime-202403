import React, { useContext } from "react";
import styles from "./index.module.css";
import logic from "../../logic";
import ViewContext from "../../ViewContext.jsx";
import Container from "../Atomic/Container.jsx";
import Text from "../Atomic/Text.jsx";
import Button from "../Atomic/Button.jsx";

function Header() {
  const { setView } = useContext(ViewContext);
  const username = logic.getUsername();

  const handleLogout = () => {
    logic.logoutUser();
    setView("login");
  };

  return (
    <Container className={styles.header}>
      <Text className={styles.username}>{username}</Text>
      <Button className={styles.logoutButton} onClick={handleLogout}>
        logout
      </Button>
    </Container>
  );
}

export default Header;
