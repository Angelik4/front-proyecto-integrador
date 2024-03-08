import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import "../css/Register.css"
import logoLogin from '../images/Group16.png';


const Register = () => {
  const [datos, setDatos] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    contrasena2:''
  });

  const [errores, setErrores] = useState({});
  const [showpwd, setshowpwd] = useState(false)
  const [showpwd2, setshowpwd2] = useState(false)

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
      alert('Registro exitoso!');
    } else {
      console.log('Formulario inválido. Por favor, completa todos los campos correctamente.');
      alert('Por favor, completa todos los campos correctamente.');
    }
  };

  const formValido = () => {
    let valid = true;
    let erroresTemp = {};

    // Validación de nombre
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(datos.nombre.trim())) {
      valid = false;
      erroresTemp.nombre = 'El nombre solo puede contener letras.';
      alert('El nombre solo puede contener letras.');
    }

    // Validación de apellido
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(datos.apellido.trim())) {
      valid = false;
      erroresTemp.apellido = 'El apellido solo puede contener letras.';
      alert('El apellido solo puede contener letras.');
    }

    // Validación de correo electrónico
    if (!/^\S+@\S+\.\S+$/.test(datos.correo.trim())) {
      valid = false;
      erroresTemp.correo = 'El correo electrónico no es válido.';
      alert('El correo electrónico no es válido.');
    }

    // Validación de contraseña
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(datos.contrasena)) {
      valid = false;
      erroresTemp.contrasena = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.';
      alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.');
    }

    if (datos.contrasena !== datos.contrasena2) {
      valid = false;
      erroresTemp.contrasena2 = 'Las contraseñas no coinciden.';
      alert('Las contraseñas no coinciden.');
    }

    setErrores(erroresTemp);
    return valid;
  };

  return (
    <div className="contenedor_register">
      <div className="imagen-logo-register">
        <img src= {logoLogin} alt="Logo" />
        <h2>Crear Cuenta</h2>
        <p>Por favor ingrese los siguientes datos para registrarse</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="campo-formulario-register">
          
          <label htmlFor="">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={datos.nombre}
            onChange={handleChange}
            placeholder='Ingresa tu Nombre'
          />
          
          <label htmlFor="">Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={datos.apellido}
            onChange={handleChange}
            placeholder='Ingresa tu Apellido'
          />
          
          <label htmlFor="">Correo:</label>
          <input
            type="email"
            name="correo"
            value={datos.correo}
            onChange={handleChange}
            placeholder='Correo electrónico'
          />
          
          <label htmlFor="">Contraseña:</label>
          <input
            type={showpwd ? "text" : "password"}
            name="contrasena"
            value={datos.contrasena}
            onChange={handleChange}
            placeholder='***************'
          />
          <div className='Icon' onClick={()=>setshowpwd(!showpwd)} >
            {showpwd ? <span className='icon-eye'><FontAwesomeIcon icon={faEye}/></span> :
            <span className='icon-eye'><FontAwesomeIcon icon={faEyeSlash}/></span>}
          </div>           

          <label htmlFor="">Repetir contraseña:</label>
          <input
            type={showpwd2 ? "text" : "password"}
            name="contrasena2"
            value={datos.contrasena2}
            onChange={handleChange}
            placeholder='***************'
          />
          <div className='Icon2' onClick={()=>setshowpwd2(!showpwd2)} >
            {showpwd2 ? <span className='icon-eye2'><FontAwesomeIcon icon={faEye}/></span> :
            <span className='icon-eye2'><FontAwesomeIcon icon={faEyeSlash}/></span>}
          </div> 

          <button type="submit">Registrarse</button>
          <p> ¿Ya tienes una cuenta? <a href='/Login'> Inicio de sesión</a> </p>
        </div>

      </form>
      
    </div>
  );


}

export default Register