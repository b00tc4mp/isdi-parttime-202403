import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import logic from '../../logic';
import useContext from '../../useContext';
import Container from '../atomic/Container';
import Text from '../atomic/Text';
import Button from '../atomic/Button';

function Header() {
   const { alert } = useContext();
   const navigate = useNavigate();
   const [name, setName] = useState('');

   useEffect(() => {
      setUsersName();
   }, []);

   const setUsersName = async () => {
      let usersName;

      try {
         usersName = await logic.getUsersName();
      } catch (error) {
         console.error(error.message);
         alert(error.message);
      }

      setName(usersName);
   };

   const handleLogout = () => {
      logic.logoutUser();
      navigate('/login');
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
