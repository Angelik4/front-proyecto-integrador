import React, { useState } from "react";
import Modal from "react-modal";
import "../../../css/FormAddSalas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../utils/SendRequest";
import { uploadFile } from "../../utils/firebase/config";

const FormAddImages = ({ isOpen, onRequestClose }) => {
  const [archivos, setArchivos] = useState([]);

  const handleArchivoChange = (e) => {
    const files = Array.from(e.target.files);
    setArchivos([...archivos, ...files]);
  };

  const handleRemoveArchivo = (index) => {
    const newArchivos = archivos.filter((_, i) => i !== index);
    setArchivos(newArchivos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const result = await uploadFile(archivos);
     console.log(result)
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
      contentLabel="Agregar Imágenes"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
        <button onClick={onRequestClose} className="btn-cerrar">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Agregar Imágenes</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="content-url-img">
            <label htmlFor="url-imagen">Selecciona las imágenes</label>
            <div className="url-img-add">
              <input
                type="file"
                id="archivo"
                multiple // Permite seleccionar múltiples archivos
                onChange={handleArchivoChange}
              />
            </div>
          </div>
          <ul className="list-url-img">
            {archivos.map((archivo, index) => (
              <li key={index}>
                <span>{archivo.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveArchivo(index)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </li>
            ))}
          </ul>
          <button type="submit" className="btn-guardar">
            Guardar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FormAddImages;