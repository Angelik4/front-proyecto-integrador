import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import logoCoworking from '../images/logo-coworking.webp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';


const Navbar = () => {
  const [mostrarLista, setMostrarLista] = useState(false);
  const toggleLista = () => {
    setMostrarLista(!mostrarLista);
  }; 
  return (
    <div className='ct_header'>
       <img src={logoCoworking} alt="logo Coworking Now" />
        <nav>
            <Link to="/">INICIO</Link>
            <Link to="/question">¿QUIENES SOMOS?</Link>
            <div className='ct_containerDrop'>
              <li onClick={toggleLista}>ESPACIOS <span><FontAwesomeIcon icon={faChevronDown} /></span></li>
              {mostrarLista && (<div className='ct_dropdown'>
                <Link to="/espacios-pet-friendly">ESPACIOS PET FRIENDLY</Link>
                <Link to="/espacios-coworking">ESPACIOS COWORKING</Link>
                <Link to="/oficinas-virtuales">OFICINAS VIRTUALES</Link>
                <Link to="/salas-vip">SALAS VIP</Link>
              </div>)}
            </div>
            <Link to="/galeria">GALERÍA</Link>
            <Link className='createAccount' to="/register">Crear cuenta</Link>
            <Link className='btnLogin' to="/login"><FontAwesomeIcon icon={faUser} />Iniciar sesión</Link>
        </nav>
    </div>
  )
}


export default Navbar