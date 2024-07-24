import React, { useContext, useState, useEffect } from "react";
import "./index.css";
import logic from "../../logic/index";
import ViewContext from "../../ViewContext.jsx";
import Container from "../atomic/Container.jsx";
import Text from "../atomic/Text.jsx";
import Button from "../atomic/Button.jsx";

function Header() {
   const { setView } = useContext(ViewContext);
   const [name, setName] = useState("");

   useEffect(() => {
      setUsersName();
   }, []);

   const setUsersName = async () => {
      let usersName;

      try {
         usersName = await logic.getUsersName();
      } catch (error) {
         console.error(error.message);
      }

      setName(usersName);
   };

   const handleLogout = () => {
      logic.logoutUser();
      setView("login");
   };

   return (
      <Container className="header">
         <Text className="username">{name}</Text>
         <Button className="logoutButton" onClick={handleLogout}>
            logout
         </Button>
      </Container>
   );
}

export default Header;
