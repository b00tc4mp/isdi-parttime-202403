import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMenuOutline } from 'react-icons/io5';
import logic from '../../../logic/index';
import './DropdownMenu.css';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(logic.isUserLoggedIn()); 
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuItemClick = (path) => {
    setIsOpen(false); 
    if (path === 'logout') {
      logic.logoutUser();
      setIsLoggedIn(false); 
      navigate('/');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="dropdown-menu">
      <button onClick={toggleMenu} className="dropdown-toggle">
        <IoMenuOutline />
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {!isLoggedIn ? (
            <>
              <button onClick={() => handleMenuItemClick('/register')}>Regístrate</button>
              <button onClick={() => handleMenuItemClick('/login')}>Inicia sesión</button>
            </>
          ) : (
            <>
              <button onClick={() => handleMenuItemClick('/perfil')}>Perfil</button>
              <button onClick={() => handleMenuItemClick('/reservas')}>Reservas</button>
              <button onClick={() => handleMenuItemClick('/favoritos')}>Favoritos</button>
              <button onClick={() => handleMenuItemClick('/rooms')}>Ofrecer</button>
              <button onClick={() => handleMenuItemClick('/rooms')}>Mis ofertas</button> 
              <button onClick={() => handleMenuItemClick('logout')} className="LogoutButton">Cerrar sesión</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

//TODO /rooms/:userId