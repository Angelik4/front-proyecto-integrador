import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../css/Panel.css';
import data from '../api/data.json';

const Categoria = () => {
  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <div className="buscador">
          <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
          <input type="text" placeholder="Buscar por Nombre/ID" />
        </div>
        <button className="agregar-usuario">
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
              <td><img src={categoria.galery[0]} alt="" /></td>
              <td>{categoria.descripcion}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categoria;
