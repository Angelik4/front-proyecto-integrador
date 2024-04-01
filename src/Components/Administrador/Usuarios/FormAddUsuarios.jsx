// FormAddUsuarios.js

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../utils/SendRequest";

const FormAddUsuarios = ({ isOpen, onRequestClose, onUserChange }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rolId, setRolId] = useState(""); 
  const [estado, setEstado] = useState("activo"); 
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    obtenerRoles();
  }, []);

  const obtenerRoles = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/rol/listar");
      setRoles(response);
    } catch (error) {
      console.error("Error al obtener los roles:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nombreCompleto = nombre + " " + apellido;
      const usuario = {
        nombre: nombreCompleto,
        correo: correo,
        contrasena: contrasena, 
        idTipoIdentificacion: 1, 
        numeroIdentificacion: 7854236, 
        estado: estado === "activo" ? 1 : 0,
        idRol: Number.isNaN(parseInt(rolId)) ? null : parseInt(rolId), 
      };
      console.log("Datos del usuario a enviar:", usuario);
      const url = "http://localhost:8081/usuario/registrar";
      const method = "POST";
  
      const response = await sendRequest(method, url, usuario);
  
      console.log("Respuesta del servidor:", response);
  
      onUserChange();
  
      onRequestClose();
    } catch (error) {
      console.error(error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Agregar Usuario"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
        <button onClick={onRequestClose} className="btn-cerrar">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Agregar Usuario</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                id="apellido"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </div>

          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="text"
              id="correo"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>
            <div className="form-group">
              <label htmlFor="rol">Rol</label>
              <select
                id="rol"
                value={rolId}
                onChange={(e) => setRolId(e.target.value)}
              >
                <option value="">Seleccionar Rol</option>
                {roles.map((rol) => (
                  <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                ))}
              </select>
            </div>
          <div className="form-group">
            <label htmlFor="estado">Estado</label>
            <select
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>

          <button type="submit" className="btn-guardar">
            Guardar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FormAddUsuarios;