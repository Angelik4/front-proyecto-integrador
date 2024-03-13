import React, { useState } from "react";
import Modal from "react-modal";
import "../../../css/Panel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FormAddCategoria = ({ isOpen, onRequestClose }) => {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [archivos, setArchivos] = useState([]);
    const [inputArchivo, setInputArchivo] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const sala = {
        nombre,
        descripcion,
        archivos,
      };
      console.log("Sala guardada:", sala);
      onRequestClose();
    };
  
    const handleArchivoChange = () => {
      // Agregar la URL de imagen a la lista de archivos
      if (inputArchivo.trim() !== "") {
        setArchivos([...archivos, inputArchivo]);
        setInputArchivo(""); // Limpiar el input de URL de imagen
      }
    };
  
    const handleRemoveArchivo = (index) => {
      const newArchivos = archivos.filter((_, i) => i !== index);
      setArchivos(newArchivos);
    };

    const customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        maxWidth: "400px",
        width: "90%",
      },
    };
    
  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    contentLabel="Agregar Sala"
    ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
      <button onClick={onRequestClose} className="btn-cerrar"> <FontAwesomeIcon icon={faXmark} /></button>
        <h2>Agregar Categoría</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nueva Categoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            rows={4}
            placeholder="Descripción de la Categoría"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>

          {/* Input para URL de imagen */}
          <div className="content-url-img">
            <label htmlFor="url-imagen">URL de imagen</label>
            <div className="url-img-add">
              <input
                type="text"
                id="url-imagen"
                placeholder="URL de la imagen"
                value={inputArchivo}
                onChange={(e) => setInputArchivo(e.target.value)}
              />
              <button
                type="button"
                onClick={handleArchivoChange}
                className="btn-agregar"
              >
                Agregar
              </button>
            </div>
          </div>
          {/* Lista de archivos seleccionados */}
          <ul className="list-url-img">
            {archivos.map((archivo, index) => (
              <li key={index}>
                <span>{archivo}</span>
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

export default FormAddCategoria;
