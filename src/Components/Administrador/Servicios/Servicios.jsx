import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../../css/Panel.css";
import data from '../../../api/data.json';
import FormAddServicios from "../Servicios/FormAddServicios"

const Servicios = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <div className="buscador">
          <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
          <input type="text" placeholder="Buscar por Nombre/ID" />
        </div>
        <button className="agregar-usuario" onClick={openModal}>
          <FontAwesomeIcon
            icon={faUserPlus}
            style={{ color: "#fff", marginRight: "5px" }}
          />
         Agregar Servicios
        </button>
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
          {data.products.slice(0, 4).map((categoria, index) => (
            <tr key={index}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td><img src={categoria.imagen} alt="" /></td>
              <td>{categoria.descripcion}</td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit', categoria)}>Editar</button>
                <button className="eliminar-usuario" onClick={() => openModal('delete', categoria)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormAddServicios isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Servicios;
