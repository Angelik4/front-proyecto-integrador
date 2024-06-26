import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faUser, faHeart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logoCoworking from '../images/logo-coworking.webp';
import '../css/Navbar.css';
import { useAuth } from '../Components/utils/AuthProvider';
import LetterAvatars from '../Components/utils/LetterAvatars';
import Profile from '../Components/utils/Profile';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      login();
    }else{
      logout();
    }
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();    
  };

  const closeModal = () => {
    setIsProfileOpen(false);
  };

  const DropdownMenu = () => {
    return (
      <div className="dropdown">
        <Link className="menu-item" onClick={() => setIsProfileOpen(true)}>
          <FontAwesomeIcon icon={faUser} /> Mi perfil
        </Link>
        <Link to="/favorites" className="menu-item">
          <FontAwesomeIcon icon={faHeart} /> Favoritos
        </Link>
        <Link to="/" onClick={handleLogout} className="menu-item">
          <FontAwesomeIcon icon={faSignOutAlt} /> Cerrar sesión
        </Link>
      </div>
    );
  };

  return (
    <header className='ct_container-header'>
      <div className='ct_header'>
        <Link to="/"><img src={logoCoworking} alt="logo Coworking Now" /></Link>
        {isLoggedIn ? (
          <>
            <div className='content-avatar'>
              <LetterAvatars />
              <button className='iconBurger' onClick={toggleMenu}>
                {showMenu ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
              </button>
            </div>
            <nav className={showMenu ? 'active' : ''}>
              <DropdownMenu />
              {isProfileOpen && <Profile isOpen={isProfileOpen} onRequestClose={closeModal} />}
            </nav>
          </>
        ) : (
          <>
            <div className='content_btns'>
              <Link className='createAccount' to="/register">Crear cuenta</Link>
              <Link className='btnLogin' to="/login">Iniciar sesión</Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;