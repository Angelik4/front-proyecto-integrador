import React, { useRef, useState, useContext } from 'react';
import { StateContext } from '../Components/utils/StateProvider'; // Importa el contexto
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import "../css/Register.css";
import logoLogin from '../images/Group16.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = () => {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    contrasena2: ''
  });

  const [errores, setErrores] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const formRef = useRef(null);
  const [, dispatch] = useContext(StateContext); // Consumir el contexto

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatos({
      ...datos,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formValido()) {
      // Enviar los datos del formulario
      console.log('Datos enviados:', datos);
      dispatch({ type: 'SET_USER_DATA', payload: datos }); // Establecer los datos del usuario en el contexto
      Swal.fire({
        icon: 'success',
        title: '¡Registro exitoso!',
        text: 'Tus datos han sido enviados correctamente.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        formRef.current.reset(); // Restablecer el formulario
      });
    } else {
      console.log('Formulario inválido. Por favor, completa todos los campos correctamente.');
    }
  };

  const formValido = () => {
    let valid = true;
    let erroresTemp = {};

    // Validación de nombre
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(datos.nombre.trim())) {
      valid = false;
      erroresTemp.nombre = 'El nombre solo puede contener letras.';
    }

    // Validación de apellido
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(datos.apellido.trim())) {
      valid = false;
      erroresTemp.apellido = 'El apellido solo puede contener letras.';
    }

    // Validación de correo electrónico
    if (!/^\S+@\S+\.\S+$/.test(datos.correo.trim())) {
      valid = false;
      erroresTemp.correo = 'El correo electrónico no es válido.';
    }

    // Validación de contraseña
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(datos.contrasena)) {
      valid = false;
      erroresTemp.contrasena = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
    }

    if (datos.contrasena !== datos.contrasena2) {
      valid = false;
      erroresTemp.contrasena2 = 'Las contraseñas no coinciden.';
    }

    setErrores(erroresTemp);
    return valid;
  };

  return (
    <div className="contenedor_register">
      <div className="imagen-logo-register">
        <img src={logoLogin} alt="Logo" />
        <h2>Crear Cuenta</h2>
        <p>Por favor ingrese los siguientes datos para registrarse</p>
      </div>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="campo-formulario-register">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            placeholder='Ingresa tu Nombre'
          />
          {errores.nombre && <p className="mensaje-error">{errores.nombre}</p>}

          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={datos.apellido}
            onChange={handleChange}
            placeholder='Ingresa tu Apellido'
          />
          {errores.apellido && <p className="mensaje-error">{errores.apellido}</p>}

          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            name="correo"
            value={datos.correo}
            onChange={handleChange}
            placeholder='Correo electrónico'
          />
          {errores.correo && <p className="mensaje-error">{errores.correo}</p>}

          <label htmlFor="contrasena">Contraseña:</label>
          <div className='input-password'>
            <input
              type={showPwd ? "text" : "password"}
              name="contrasena"
              value={datos.contrasena}
              onChange={handleChange}
              placeholder='***************'
            />
            <div className='Icon' onClick={() => setShowPwd(!showPwd)}>
              {showPwd ? <span className='icon-eye'><FontAwesomeIcon icon={faEye} /></span> :
                <span className='icon-eye'><FontAwesomeIcon icon={faEyeSlash} /></span>}
            </div>
          </div>
          {errores.contrasena && <p className="mensaje-error">{errores.contrasena}</p>}

          <label htmlFor="contrasena2">Repetir contraseña:</label>
          <div className='input-password'>
            <input
              type={showPwd2 ? "text" : "password"}
              name="contrasena2"
              value={datos.contrasena2}
              onChange={handleChange}
              placeholder='***************'
            />
            <div className='Icon2' onClick={() => setShowPwd2(!showPwd2)}>
              {showPwd2 ? <span className='icon-eye'><FontAwesomeIcon icon={faEye} /></span> :
                <span className='icon-eye'><FontAwesomeIcon icon={faEyeSlash} /></span>}
            </div>
          </div>
          {errores.contrasena2 && <p className="mensaje-error">{errores.contrasena2}</p>}

          <button type="submit">Registrarse</button>
          <p> ¿Ya tienes una cuenta? <Link to='/login'> Inicio de sesión</Link> </p>
        </div>
      </form>
    </div>
  );
}

export default Register;