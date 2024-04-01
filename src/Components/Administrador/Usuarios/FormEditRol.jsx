// FormEditRol.js

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../utils/SendRequest";

const FormEditRol = ({ isOpen, onRequestClose, usuarioToEdit, onUserChange }) => {
  const [rolId, setRolId] = useState(""); 
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

  useEffect(() => {
    if (usuarioToEdit) {
      setRolId(usuarioToEdit.idRol);
    }
  }, [usuarioToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const usuario = {
        rol: Number(rolId),
      };
      console.log("Datos del usuario a enviar:", usuario);
      const url = `http://localhost:8081/usuario/modificar/${usuarioToEdit.id}`;
      const response = await sendRequest("PATCH", url, usuario);
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
      contentLabel="Editar Rol"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
        <button onClick={onRequestClose} className="btn-cerrar">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Editar Rol</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn-guardar">
            Guardar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FormEditRol;