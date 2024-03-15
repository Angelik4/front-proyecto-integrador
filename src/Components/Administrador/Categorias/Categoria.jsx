import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../../css/Panel.css";
import FormAddCategoria from '../Categorias/FormAddCategoria';
import sendRequest from "../../utils/SendRequest"; // Importa la función para enviar solicitudes

const Categoria = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tipoSalas, setTipoSalas] = useState([]);

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
        setTipoSalas(response.data); 
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    obtenerCategorias(); 
  }, []); */

  const listarCategorias = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/tiposala/listar");
      console.log("Categorías obtenidas:", response);
      setTipoSalas(response.data);
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
          Agregar Categoria
          </button>
        </div>
        <button className="btn-listar" onClick={listarCategorias}>Listar Categorías</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>IMAGEN</th>
            <th>DESCRIPCION</th>
            <th>ACCION</th>
          </tr>
        </thead>
        <tbody>
          {tipoSalas.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit', categoria)}>Editar</button>
                <button className="eliminar-usuario" onClick={() => openModal('delete', categoria)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormAddCategoria isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Categoria;