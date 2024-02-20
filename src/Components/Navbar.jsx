import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import logoCoworking from '../images/logo-coworking.webp';

const Navbar = () => {
  return (
    <div className='ct_header'>
       <img src={logoCoworking} alt="logo Coworking Now" />
        <nav>
            <Link to="/">INICIO</Link>
            <Link to="/catalogo">CATALOGO</Link>
            <Link to="/question">¿QUIENES SOMOS?</Link>
            <Link to="/contacto">CONTACTO</Link>
            <Link className='createAccount' to="/register">Crear cuenta</Link>
            <Link className='btnLogin' to="/login"><FontAwesomeIcon icon={faUser} />Iniciar sesión</Link>
        </nav>
    </div>
  )
}

export default Navbar