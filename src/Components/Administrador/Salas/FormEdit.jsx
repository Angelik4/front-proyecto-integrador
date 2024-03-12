import React, { useState } from "react";
import Modal from "react-modal";
import "../../../css/FormAddSalas.css";

const FormEdit = ({ isOpen, onRequestClose }) => {

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [archivos, setArchivos] = useState([]);
  
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
  
    const handleArchivoChange = (e) => {
      const files = Array.from(e.target.files);
      setArchivos([...archivos, ...files]);
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
        <h2>Editar</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nuevo nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            rows={4}
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>

          <label htmlFor="archivo">Imagen</label>
          <input
            type="file"
            id="archivo"
            multiple
            onChange={handleArchivoChange}
          />

          {/* Lista de archivos seleccionados */}
          <ul>
            {archivos.map((archivo, index) => (
              <li key={index}>
                {archivo.name}
                <button
                  type="button"
                  onClick={() => handleRemoveArchivo(index)}
                >
                  Eliminar
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

export default FormEdit;
