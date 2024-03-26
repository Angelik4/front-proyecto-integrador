import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../../css/Panel.css";
import FormAddImages from '../Imagenes/FormAddImages';
import sendRequest from "../../utils/SendRequest"; 

const Images = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [salaImages, setSalaImages] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  /* useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await sendRequest("GET", "http://localhost:8081/tiposala/listar");
        console.log("Categorías obtenidas:", response);
        setSalaImages(response.data); 
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    obtenerCategorias(); 
  }, []); */

  const listarImages = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/tiposala/listar");
      console.log("Imagenes obtenidas:", response);
      setSalaImages(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <div className="content-buscador">
          <div className="buscador">
            <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
          <input type="text" placeholder="Buscar por Nombre/ID" />
          </div>
          <button className="agregar-usuario" onClick={openModal}>
            <FontAwesomeIcon
              icon={faUserPlus}
              style={{ color: "#fff", marginRight: "5px" }}
            />
          Agregar Imagenes
          </button>
        </div>
        <button className="btn-listar" onClick={listarImages}>Listar Categorías</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>IMAGEN</th>
            <th>ACCION</th>
          </tr>
        </thead>
        <tbody>
          {salaImages.map((images) => (
            <tr key={images.id}>
              <td>{images.id}</td>
              <td>{images.imagen}</td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit', images)}>Editar</button>
                <button className="eliminar-usuario" onClick={() => openModal('delete', images)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormAddImages isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Images;