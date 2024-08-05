import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoMenuOutline } from 'react-icons/io5';
import logic from '../../../logic/index';
import './DropdownMenu.css';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para el login

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(logic.isUserLoggedIn()); // Verifica si el usuario está loggeado
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuItemClick = (path) => {
    setIsOpen(false); // Cierra el menú después de seleccionar un elemento
    if (path === 'logout') {
      logic.logoutUser();
      navigate('/');
      setIsLoggedIn(false); // Actualiza el estado de login
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
              <Link to="/register" onClick={() => handleMenuItemClick('/register')}>Regístrate</Link>
              <Link to="/login" onClick={() => handleMenuItemClick('/login')}>Inicia sesión</Link>
            </>
          ) : (
            <>
              <Link to="/perfil" onClick={() => handleMenuItemClick('/perfil')}>Perfil</Link>
              <Link to="/reservas" onClick={() => handleMenuItemClick('/reservas')}>Reservas</Link>
              <Link to="/favoritos" onClick={() => handleMenuItemClick('/favoritos')}>Favoritos</Link>
              <Link to="/rooms" onClick={() => handleMenuItemClick('/rooms')}>Ofrecer</Link>
              <Link to="/rooms" onClick={() => handleMenuItemClick('/rooms')}>Mis ofertas</Link> 
              <Link className="LogoutButton" onClick={() => handleMenuItemClick('logout')}>Cerrar sesión</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;

//TODO /rooms/:userId