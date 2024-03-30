import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../utils/SendRequest";
import { uploadFile } from "../../utils/firebase/config";

const FormAddCategoria = ({ isOpen, onRequestClose, actionType, categoriaToEdit, onCategoriaChange }) => {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [descripcionCategoria, setDescripcionCategoria] = useState("");
  const [imagenCategoria, setImagenCategoria] = useState(null); 
  const [imagenPrevisualizada, setImagenPrevisualizada] = useState(null); 

  useEffect(() => {
    if (actionType === "edit" && categoriaToEdit) {
      setNombreCategoria(categoriaToEdit.nombre);
      setDescripcionCategoria(categoriaToEdit.descripcion);
      setImagenPrevisualizada(categoriaToEdit.imagen); 
    } else {
      // Resetear los campos al abrir el modal en modo de agregar
      setNombreCategoria("");
      setDescripcionCategoria("");
      setImagenCategoria(null);
      setImagenPrevisualizada(null);
    }
  }, [actionType, categoriaToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData(); 

      if (imagenCategoria) {
        const imageURL = await uploadFile(imagenCategoria);
        formData.append("imagen", imageURL[0]);
      }

      formData.append("nombre", nombreCategoria);
      formData.append("descripcion", descripcionCategoria);

      let endpoint = "";
      let method = "";

      if (actionType === "edit" && categoriaToEdit) {
        endpoint = `http://localhost:8081/tiposala/modificar/${categoriaToEdit.id}`;
        method = "PATCH";
      } else {
        endpoint = "http://localhost:8081/tiposala/registrar";
        method = "POST";
      }

      const response = await sendRequest(method, endpoint, formData, {
        'Content-Type': 'multipart/form-data' 
      });

      console.log("Respuesta del servidor:", response);
      onRequestClose();

      // Después de agregar o editar una categoría, llama a la función onCategoriaChange para actualizar la lista de categorías en el componente padre
      onCategoriaChange();

      // Limpiar los campos después de guardar exitosamente
      setNombreCategoria("");
      setDescripcionCategoria("");
      setImagenCategoria(null);
      setImagenPrevisualizada(null);
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
      contentLabel={actionType === "edit" ? "Editar Categoría" : "Agregar Categoría"}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
        <button onClick={onRequestClose} className="btn-cerrar">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>{actionType === "edit" ? "Editar Categoría" : "Agregar Categoría"}</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="nombreCategoria">Nombre</label>
          <input
            type="text"
            id="nombreCategoria"
            placeholder="Nueva Categoría"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
          />
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            rows={4}
            placeholder="Descripción de la sala"
            value={descripcionCategoria}
            onChange={(e) => setDescripcionCategoria(e.target.value)}
          ></textarea>
          <label htmlFor="imagenCategoria">Imagen</label>
          {imagenPrevisualizada && (
            <img src={imagenPrevisualizada} alt="Imagen Previsualizada" style={{ maxWidth: "100%", marginBottom: "10px" }} />
          )}
          <input
            type="file"
            id="imagenCategoria"
            onChange={(e) => setImagenCategoria(e.target.files[0])}
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