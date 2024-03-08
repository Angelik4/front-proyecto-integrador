import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import logoCoworking from '../images/logo-coworking.webp';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import '../css/Navbar.css';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';




const Navbar = () => {
  const { state } = useLocation();

  console.log("Estado" + state);

  const [mostrarLista, setMostrarLista] = useState(false);
  const [iconoMenu, setIconoMenu] = useState(true);

  const toggleLista = () => {
    setMostrarLista(!mostrarLista);
  };
  const cambiarIcono = () => {
    setIconoMenu(!iconoMenu);
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
          <IconButton color="inherit" aria-label="menu" className='customIcon'>
            <MenuIcon />
          </IconButton>
          <Avatar sx={{ bgcolor: '#F2994A' }}>AN</Avatar>
        </nav>
      </div>
    </header>
  )
}

export default Navbar