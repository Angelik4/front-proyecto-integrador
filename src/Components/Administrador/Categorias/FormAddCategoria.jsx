import React, { useState } from "react";
import Modal from "react-modal";
import "../../../css/FormAddSalas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../utils/SendRequest";

const FormAddCategoria = ({ isOpen, onRequestClose }) => {
  const [nombreCategoria, setNombreCategoria] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest(
        "POST",
        "http://localhost:8081/tiposala/registrar",
        { nombre: nombreCategoria }
      );
      console.log("Respuesta del servidor:", response);
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
      contentLabel="Agregar Categoría"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
        <button onClick={onRequestClose} className="btn-cerrar">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Agregar Categoría</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="nombreCategoria">Nombre</label>
          <input
            type="text"
            id="nombreCategoria"
            placeholder="Nueva Categoría"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
          />
          <button type="submit" className="btn-guardar">
            Guardar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FormAddCategoria;