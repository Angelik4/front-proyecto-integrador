import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../utils/SendRequest";

const FormAddServicios = ({ isOpen, onRequestClose, actionType, servicioToEdit, onServicioChange }) => {
  const [nombreServicio, setNombreServicio] = useState("");
  const [estadoServicio, setEstadoServicio] = useState(1); // Por defecto, el estado es 1 (Activo)

  useEffect(() => {
    if (actionType === "edit" && servicioToEdit) {
      setNombreServicio(servicioToEdit.nombre);
      setEstadoServicio(servicioToEdit.estado);
    } else {
      setNombreServicio("");
      setEstadoServicio(1); // Por defecto, establecer el estado como Activo al agregar un nuevo servicio
    }
  }, [actionType, servicioToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        nombre: nombreServicio,
        estado: estadoServicio
      };

      let endpoint = "";
      let method = "";

      if (actionType === "edit" && servicioToEdit) {
        endpoint = `http://localhost:8081/servicio/modificar/${servicioToEdit.id}`;
        method = "PATCH";
      } else {
        endpoint = "http://localhost:8081/servicio/registrar";
        method = "POST";
      }

      const response = await sendRequest(method, endpoint, formData);
      console.log("Respuesta del servidor:", response);
      onRequestClose();
      onServicioChange();

      // Limpiar los campos después de guardar exitosamente
      setNombreServicio("");
      setEstadoServicio(1); // Por defecto, restablecer el estado como Activo
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
      width: "500px",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={actionType === "edit" ? "Editar Servicio" : "Agregar Servicio"}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
        <button onClick={onRequestClose} className="btn-cerrar">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>{actionType === "edit" ? "Editar Servicio" : "Agregar Servicio"}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="nombreServicio">Nombre</label>
          <input
            type="text"
            id="nombreServicio"
            placeholder="Nombre del Servicio"
            value={nombreServicio}
            onChange={(e) => setNombreServicio(e.target.value)}
          />
          <label htmlFor="estadoServicio">Estado</label>
          <select
            id="estadoServicio"
            value={estadoServicio}
            onChange={(e) => setEstadoServicio(Number(e.target.value))}
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>
          <button type="submit" className="btn-guardar">
            Guardar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FormAddServicios;