import React from 'react';
import { Link } from 'react-router-dom'
import logoCoworkingWhite from '../images/logo-blanco-coworking.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faSquareFacebook, faYoutube, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import '../css/Footer.css'

const Footer = () => {
  return (
    <section className='ft-container-footer'>
      <div className='ft-content-logos'>
        <img src={logoCoworkingWhite} alt="Logo Coworking Now" />
        <div className='ft-content-icons'>
            <Link to="/"><FontAwesomeIcon className='icon-redes' icon={faInstagram} /></Link>
            <Link to="/"><FontAwesomeIcon className='icon-redes' icon={faSquareFacebook} /></Link>
            <Link to="/"><FontAwesomeIcon className='icon-redes' icon={faYoutube} /></Link>
            <Link to="/"><FontAwesomeIcon className='icon-redes' icon={faXTwitter} /> </Link>
        </div>
      </div>
      <div className='ft-content-list'>
        <ul>
          <li>Oficinas</li>
          <li>Soporte</li>
          <li>¿Quienes somos?</li>
          <li>Tienda de café</li>
        </ul>
        <ul>
          <li>Oficinas</li>
          <li>Soporte</li>
          <li>Desayunos</li>
          <li>Renta de bicicletas</li>
        </ul>
        <ul>
          <li>Oficinas</li>
          <li>Soporte</li>
          <li>Contacto</li>
          <li>Renta de bicicletas</li>
        </ul>
      </div>

    </section>
  )
}

export default Footer