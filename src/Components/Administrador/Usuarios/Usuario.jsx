import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../../css/Panel.css'

const Usuario = () => {
  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <div className="buscador">
          <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
          <input type="text" placeholder="Buscar por Nombre/ID" />
        </div>
        <button className="agregar-usuario">
          <FontAwesomeIcon icon={faUserPlus} style={{ color: '#fff', marginRight: '5px' }} />
          Agregar Usuario
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>APELLIDO</th>
            <th>CORREO</th>
            <th>CONTRASEÑA</th>
            <th>ROL</th>
            <th>ESTADO</th>
            <th>ACCION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Gabriela</td>
            <td>Hernández</td>
            <td>Gjfjsofbeo@gmail.com</td>
            <td>**************</td>
            <td>Administrador</td>
            <td>Activo</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Esmeralda</td>
            <td>Benitez</td>
            <td>Efjsofbeo@gmail.com</td>
            <td>**************</td>
            <td>Usuario</td>
            <td>Activo</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Angelica</td>
            <td>Urrego</td>
            <td>Bfjsofbeo@gmail.com</td>
            <td>**************</td>
            <td>Administrador</td>
            <td>Activo</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Beatriz</td>
            <td>Carvajal</td>
            <td>UUfjsofbeo@gmail.com</td>
            <td>**************</td>
            <td>Usuario</td>
            <td>Inactivo</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Usuario;
