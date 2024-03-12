import React from "react";
import Modal from "react-modal";
import '../../../css/Delete.css'; // Importa los estilos de Delete.css

const FormDelete = ({ isOpen, onRequestClose, itemType }) => {
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

  // Define el mensaje basado en el tipo de elemento
  let message;
  switch (itemType) {
    case "categoria":
      message = "¿Está seguro de querer eliminar esta categoría?";
      break;
    case "sala":
      message = "¿Está seguro de querer eliminar esta sala?";
      break;
    case "usuario":
      message = "¿Está seguro de querer eliminar este usuario?";
      break;
    default:
      message = "¿Está seguro de querer eliminar este elemento?";
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={`Eliminar ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
        <h2>Mensaje</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button className="Close" onClick={onRequestClose}>No</button>
          <button className="Continue" onClick={onRequestClose}>Sí</button>
        </div>
      </div>
    </Modal>
  );
};

export default FormDelete;
