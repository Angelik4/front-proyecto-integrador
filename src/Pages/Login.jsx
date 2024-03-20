import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../css/Login.css"
import logoLogin from '../images/Group16.png';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Iniciamos como válido por defecto

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const isValid = validateEmail(newEmail);
    setIsValidEmail(isValid);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    console.log(email,password)
    if (email && password && isValidEmail) {
      navigate('/home', {
        replace: true,
        state: {
          logged: true,
          email,
        },
      });
    } else {
      // No hacemos nada si los campos no están completos o el correo no es válido
    }
  };

  return (
    <div className="contenedor_login">
      <div className="imagen-logo">
        <img src={logoLogin} alt="Logo" />
      </div>
      <div className="contenedor_login-title">
        <h2>Inicio de sesión</h2>
        <p>Por favor ingrese su usuario y contraseña</p>
      </div>
      <form>
        <div className="campo-formulario">
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="Esteban_schiller@gmail.com"
            onChange={handleEmailChange}
            required
          />
          {!isValidEmail && <p className="mensaje-error">Su correo no tiene el formato correcto</p>}
        </div>
        <div className="campo-formulario">
          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="contrasena"
            name="contrasena"
            placeholder="**************"
            onChange={handlePasswordChange}
            required
          />
          <div className='Icon' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <span className='icon-eye'><FontAwesomeIcon icon={faEye} /></span> :
              <span className='icon-eye'><FontAwesomeIcon icon={faEyeSlash} /></span>
            }
          </div>
        </div>
        <div className="contenedor_login-recordar-contrasena">
          <input type="checkbox" id="recordar-contrasena" name="recordar-contrasena" />
          <label htmlFor="recordar-contrasena">Recordar contraseña</label>
        </div>
        <button type="button" onClick={handleLogin}>Iniciar sesión</button>
        <Link className='olvidoContrasena' to='#'>¿Olvidó su contraseña?</Link>
        <p>¿No tienes una cuenta? <Link to="/register">Crear cuenta</Link></p>
      </form>
    </div>
  );
};

export default Login;
