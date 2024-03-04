import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import "../css/Login.css"
import logoLogin from '../images/Group16.png';

  function Login() {
    const [showpwd, setshowpwd] = useState(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
  
    const handleEmailChange = (event) => {
      const newEmail = event.target.value;
      setEmail(newEmail);
      const isValid = validateEmail(newEmail);
      setIsValidEmail(isValid);
    };
  
    const validateEmail = (email) => {
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regex.test(email);
    };
    
  return (
    <div className="contenedor_login">
      <div className="imagen-logo">
        <img src= {logoLogin} alt="Logo" />
      </div>
      <div className="contenedor_login-title">
      <h2>Inicio de sesión</h2>
      <p>Por favor ingrese su usuario y contraseña</p>
      </div>
      <form action="#">
        <div className="campo-formulario">
          <label for="email">Correo electrónico:</label>
          <input type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  placeholder="Esteban_schiller@gmail.com"
                  onChange={handleEmailChange} /></div>
        <div className={`campo-formulario ${isValidEmail ? 'campo-valido' : 'campo-invalido'}`}>
        </div>
          <div className="campo-formulario">
          <label for="contrasena">Contraseña:</label>
            <input type={showpwd ? "text" : "password"} id="contrasena" name="contrasena" placeholder="**************" />
            <div className='Icon' onClick={()=>setshowpwd(!showpwd)} >
            {showpwd ? <span className='icon-eye'><FontAwesomeIcon icon={faEye}/></span> :
            <span className='icon-eye'><FontAwesomeIcon icon={faEyeSlash}/></span>
            }
            </div> 
        </div>
        <div className="contenedor_login-recordar-contrasena">
          <input type="checkbox" id="recordar-contrasena" name="recordar-contrasena" />
          <label for="recordar-contrasena">Recordar contraseña</label>
        </div>
        <button type="submit">Iniciar sesión</button>
        <a className= 'olvidoContrasena' href= '#'>¿Olvidó su contraseña?</a>
        <p> ¿No tienes una cuenta? <a href="#"> Crear cuenta</a> </p> 
      </form>
    </div>
  );
};

export default Login;

