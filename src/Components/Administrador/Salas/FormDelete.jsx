import React from "react";
import Modal from "react-modal";
import '../../../css/Delete.css'; // Importa los estilos de Delete.css

const FormDelete = ({ isOpen, onRequestClose }) => {
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
      contentLabel="Eliminar Categoría"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
        <h2>Mensaje</h2>
        <p>¿Está seguro de querer eliminar esta categoría?</p>
        <div className="modal-buttons">
          <button className="Close" onClick={onRequestClose}>No</button>
          <button className="Continue" onClick={onRequestClose}>Si</button>
        </div>
      </div>
    </Modal>
  );
};

export default FormDelete;
