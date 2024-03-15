import React, { useState } from "react";
import "../../../css/FormAddSalas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FormAddImages = () => {
    const [archivos, setArchivos] = useState([]);
    const [inputArchivo, setInputArchivo] = useState(""); // Estado para el input de URL de imagen

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
  return (
    <div>
        <form action="">
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
        </form>
    </div>
  )
}

export default FormAddImages