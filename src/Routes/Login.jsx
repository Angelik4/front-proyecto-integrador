import React from 'react'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import "../css/Login.css"
import logoLogin from '../images/Group16.png';

const Login = () => {
  const [showpwd, setshowpwd] = useState(false)
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
          <label for="correo">Correo electrónico:</label>
          <input type="email" id="correo" name="correo" placeholder="Esteban_schiller@gmail.com" />
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
        <button type="submit">Registrar</button>
        <a className= 'olvidoContrasena' href= '#'>¿Olvidó su contraseña?</a>
        <p> ¿No tienes una cuenta? <a href="#"> Crear cuenta</a> </p> 
      </form>
    </div>
  );
};

export default Login;

