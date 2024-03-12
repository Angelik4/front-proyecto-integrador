import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../../css/Panel.css";
import data from '../../../api/data.json';
import FormAddCategoria from './FormAddCategoria'
import FormEdit from "./FormEdit";
import FormDelete from "./FormDelete";

const Categoria = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  const openModal = (actionType, categoria) => {
    setIsOpen(true);
    setCategoriaSeleccionada(categoria);
    if (actionType === 'edit') {
      setIsEditing(true);
      setIsDeleting(false);
    } else if (actionType === 'delete') {
      setIsEditing(false);
      setIsDeleting(true);
    } else {
      setIsEditing(false);
      setIsDeleting(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditing(false);
    setIsDeleting(false);
    setCategoriaSeleccionada(null);
  };

  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <div className="buscador">
          <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
          <input type="text" placeholder="Buscar por Nombre/ID" />
        </div>
        <button className="agregar-usuario" onClick={() => openModal('add')}>
          <FontAwesomeIcon icon={faUserPlus} style={{ color: '#fff', marginRight: '5px' }} />
          Agregar Categoria
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
      {isEditing && categoriaSeleccionada && <FormEdit isOpen={modalIsOpen} onRequestClose={closeModal} categoria={categoriaSeleccionada} />}
      {isDeleting && <FormDelete isOpen={modalIsOpen} onRequestClose={closeModal} itemType="categoria" />}
      {!isEditing && !isDeleting && <FormAddCategoria isOpen={modalIsOpen} onRequestClose={closeModal} />}
    </div>
  );
};

export default Categoria;
