import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import logoCoworking from '../images/logo-coworking.webp';
import { StateContext } from './utils/StateProvider'; // Importa el contexto
import '../css/Navbar.css';

const Navbar = () => {
  
  const [iconoMenu, setIconoMenu] = useState(true);
  const [iconoMenuDesk, setIconoMenuDesk] = useState(true);
  const [state] = useContext(StateContext); // Consumir el contexto para acceder al estado con los datos del usuario

  const cambiarIcono = () => {
    setIconoMenu(!iconoMenu);
  };
  const cambiarIconoDesk = () => {
    setIconoMenuDesk(!iconoMenuDesk)
  }

  // Verificar si hay datos de usuario y mostrar el nombre de usuario en el avatar
  const renderAvatar = () => {
    if (state.userData) {
      const { nombre, apellido } = state.userData;
      const nombreInicial = nombre.charAt(0).toUpperCase();
      const apellidoInicial = apellido.charAt(0).toUpperCase();
      return <div className='avatar'>{nombreInicial}{apellidoInicial}</div>;
    }
    return null;
  };
  

  return (
    <header className='ct_container-header'>
      <div className='ct_header'>
        <Link to="/"><img src={logoCoworking} alt="logo Coworking Now" /></Link>
        <button className='iconBurgerMob' onClick={cambiarIcono}> {iconoMenu ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faXmark} />}</button>
        <nav className={iconoMenu ? '' : 'active'}>
          <Link className='createAccount' to="/register">Crear cuenta</Link>
          <Link className='btnLogin' to="/Login"><FontAwesomeIcon icon={faUser} />Iniciar sesión</Link>
        </nav>
        <nav>
          {renderAvatar()}
          <button className='iconBurgerDesk' onClick={cambiarIconoDesk}> {iconoMenuDesk ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faXmark} />}</button>
          <div className={`contentDropAvatar ${iconoMenuDesk ? '' : 'active'}`}>
             <Link>Mi perfil</Link>
             <Link>Cerrar sesión</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;