import React, { useContext } from "react";
import styles from "./index.module.css";
import logic from "../../logic/index";
import ViewContext from "../../ViewContext.jsx";
import Container from "../atomic/Container.jsx";
import Text from "../atomic/Text.jsx";
import Button from "../atomic/Button.jsx";

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
