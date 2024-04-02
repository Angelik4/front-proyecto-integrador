import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import logoCoworking from '../images/logo-coworking.webp';
import '../css/Navbar.css';
import { useAuth } from '../Components/utils/AuthProvider';


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    // Verifica si el usuario está autenticado al cargar el componente
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      login(); // Actualiza el estado de autenticación
    }
  },);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout(); // Actualiza el estado de autenticación
   
  };

  return (
    <header className='ct_container-header'>
      <div className='ct_header'>
        <Link to="/"><img src={logoCoworking} alt="logo Coworking Now" /></Link>
        <button className='iconBurger' onClick={toggleMenu}>
          {showMenu ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
        </button>
        <nav className={showMenu ? 'active' : ''}>
          {isLoggedIn ? (
            <>
              <Link to="/profile">Mi perfil</Link>
              <button onClick={handleLogout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link className='createAccount' to="/register">Crear cuenta</Link>
              <Link className='btnLogin' to="/login">Iniciar sesión</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;