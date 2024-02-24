import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import logoCoworking from '../images/logo-coworking.webp';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../css/Navbar.css';


const Navbar = () => {
  const [mostrarLista, setMostrarLista] = useState(false);
  const [iconoMenu, setIconoMenu] = useState(true);
  
  const toggleLista = () => {
    setMostrarLista(!mostrarLista);
  }; 
  const cambiarIcono = () => {
    setIconoMenu(!iconoMenu);
  };
  return (
    <section className='ct_container-header'>
        <div className='ct_header'>
        <Link to="/"><img src={logoCoworking} alt="logo Coworking Now" /></Link>
        <button className='iconBurgerMob' onClick={cambiarIcono}> {iconoMenu ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faXmark} /> }</button>
          <nav className={iconoMenu ? '' : 'active'}>
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
    </section>
  )
}

export default Navbar