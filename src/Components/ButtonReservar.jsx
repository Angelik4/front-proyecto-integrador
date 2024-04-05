import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import sendRequest from "../Components/utils/SendRequest";
import { jwtDecode } from "jwt-decode";
import CalendarDetails from './CalendarDetails';

const ButtonReservar = ({ salaId, occupiedTimes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [calificacion, setCalificacion] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    try {
      const response = await sendRequest(
        "GET",
        "http://localhost:8081/usuario/listar"
      );
      setUsuarios(response);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      setError('Error al obtener los usuarios. Por favor, inténtelo de nuevo más tarde.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuarioId = usuarios.find((u) => u.correo === email)?.id;
    if (!usuarioId) {
      setError('El usuario con este correo electrónico no está registrado.');
      return;
    }

    try {
      // Formatear las fechas a la cadena "yyyy-MM-dd HH:mm"
      const formattedStartDate = selectedDates[0].toISOString().slice(0, 16).replace('T', ' ');
      const formattedEndDate = selectedDates[1].toISOString().slice(0, 16).replace('T', ' ');

      const reservaData = {
        idUsuario: usuarioId,
        idSala: salaId,
        fechaHoraInicio: formattedStartDate,
        fechaHoraFin: formattedEndDate,
        calificacion: parseInt(calificacion),
        "Cantidad de personas": parseInt(cantidad)
      };

      console.log('Datos a enviar:', reservaData);

      const response = await sendRequest("POST", "http://localhost:8081/reservaespacio/registrar", reservaData);
      console.log('Respuesta del servidor:', response);

      setIsOpen(false);
    } catch (error) {
      console.error("Error al realizar la reserva:", error);
      setError('Error al realizar la reserva. Por favor, inténtelo de nuevo más tarde.');
    }
  };

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

  const handleLogin = async () => {
    if (email && isValidEmail) {
      try {
        const response = await sendRequest("POST", 'http://localhost:8081/auth/authenticate', {
          correo: email,
        });

        const token = response.jwt;
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken?.rol;
        setUserRole(userRole);

      } catch (error) {
        setError('Credenciales inválidas. Por favor, inténtelo de nuevo.');
      }
    } else {
      setError('Por favor complete todos los campos correctamente.');
    }
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "60%", // Ancho del modal, puedes ajustar el valor según tus necesidades
      height: "70%", // Alto del modal, puedes ajustar el valor según tus necesidades
      overflow: "auto" // Añadir scroll si el contenido es demasiado grande para el modal
    },
  };

  return (
    <div>
      <Link className='cards_btnReservar' to="" onClick={() => setIsOpen(true)}>
        Reservar<FontAwesomeIcon icon={faArrowRight} />
      </Link>

      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
      >
        <div className="modal-containerButton">
          <button onClick={onRequestClose} className="btn-cerrar">
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <h2>Reservar Sala Coworking</h2>
          <div className='modal-calendario'>
            <CalendarDetails salaId={salaId} occupiedTimes={occupiedTimes} setSelectedDates={setSelectedDates} />
          </div>
          <div className="campo-formulario">
            <div className="campo-formulario_item">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="correo@gmail.com"
                onChange={handleEmailChange}
                required
              />
            </div>
            {!isValidEmail && <p className="mensaje-error">Su correo no tiene el formato correcto</p>}
            <div className="campo-formulario_item">
              <label htmlFor="cantidad">Cantidad de Personas</label>
              <input
                type="number"
                id="cantidad"
                placeholder="Número de Personas"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)} // Manejo de estado para cantidad
              />
            </div>
            <div className="campo-formulario_item">
              <label htmlFor="calificacion">Calificación</label>
              <input
                type="number"
                id="calificacion"
                placeholder="Calificación  (0 a 10)"
                value={calificacion}
                onChange={(e) => setCalificacion(e.target.value)} // Manejo de estado para calificacion
              />
            </div>
          </div>
          <button className="btn-enviar" onClick={handleSubmit}>
            Enviar
          </button>
          {error && <p className="mensaje-error">{error}</p>}
          {userRole && <p className="mensaje-exito">Su rol es {userRole}</p>}
        </div>
      </Modal>
    </div>
  );
};

export default ButtonReservar;
