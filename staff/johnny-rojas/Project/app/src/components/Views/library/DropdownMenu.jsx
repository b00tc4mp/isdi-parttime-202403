import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoMenuOutline } from 'react-icons/io5';
import './DropdownMenu.css';
import logic from '../../../logic/index';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleMenuItemClick = (path) => {
    setIsOpen(false); // Cierra el menú después de seleccionar un elemento
    if (path === 'logout') {
      logic.logoutUser();
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
          <Link to="/register" onClick={() => handleMenuItemClick('/register')}>Regístrate</Link>
          <Link to="/login" onClick={() => handleMenuItemClick('/login')}>Inicia sesión</Link>
          <Link to="/perfil" onClick={() => handleMenuItemClick('/perfil')}>Perfil</Link>
          <Link to="/reservas" onClick={() => handleMenuItemClick('/reservas')}>Reservas</Link>
          <Link to="/favoritos" onClick={() => handleMenuItemClick('/favoritos')}>Favoritos</Link>
          <Link to="/ofrecer" onClick={() => handleMenuItemClick('/ofrecer')}>Ofrecer</Link>
          <Link className="LogoutButton" onClick={() => handleMenuItemClick('logout')}>Cerrar sesión</Link>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;