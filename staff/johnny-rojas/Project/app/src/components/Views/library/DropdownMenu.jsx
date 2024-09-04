import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoMenuOutline } from 'react-icons/io5';
import logic from '../../../logic/index';
import './DropdownMenu.css';
import { getUserId } from '../../../logic/getUserInfo';

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null)

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(logic.isUserLoggedIn());
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setUserId(getUserId())
    }
  }, [isLoggedIn])

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logic.logoutUser();
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate('/');
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
              <Link to='/register'>Regístrate</Link>
              <Link to='/login'>Inicia sesión</Link>
            </>
          ) : (
            <>
              <Link to={`/users/${userId}/manage`}>Editar contacto</Link>
              <Link to={`/users/${userId}/bookings`}>Reservas</Link>
              <Link to='/rooms'>Ofrecer</Link>
              <Link to={`/users/${userId}/rooms`}>Mis ofertas</Link>
              <button onClick={handleLogout} className="LogoutButton">Cerrar sesión</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
