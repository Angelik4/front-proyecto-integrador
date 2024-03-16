import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../../css/Panel.css';
import FormAddUsuarios from '../Usuarios/FormAddUsuarios';
import sendRequest from '../../utils/SendRequest';
import FormDelete from '../Salas/FormDelete';

const Usuario = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const listarUsuarios = async () => {
    try {
      const response = await sendRequest('GET', 'http://localhost:8081/usuario/listar');
      console.log('Usuarios obtenidos:', response);
      if (response && response.length > 0) {
        const usuariosFormateados = response.map((usuario) => {
          const nombreCompleto = usuario.nombre.split(' ');
          const nombre = nombreCompleto[0] || '';
          const apellido = nombreCompleto.slice(1).join(' ') || ''; 
          return {
            id: usuario.id || '',
            nombre: nombre || '',
            apellido: apellido || '',
            correo: usuario.correo || '',
            contrasena: '******',
            rol: usuario.idRol ? usuario.idRol.nombre : '',
            estado: usuario.estado === 1 ? 'Activo' : 'Inactivo',
          };
        });
        setUsuarios(usuariosFormateados);
      } else {
        console.error('La respuesta no contiene datos válidos:', response);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };
  

  useEffect(() => {
    listarUsuarios();
  }, []);

  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <div className="buscador">
          <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
          <input type="text" placeholder="Buscar por Nombre/ID" />
        </div>
        <button className="agregar-usuario" onClick={openModal}>
          <FontAwesomeIcon icon={faUserPlus} style={{ color: '#fff', marginRight: '5px' }} />
          Agregar Usuario
        </button>
      </div>
      {/* <button className="btn-listar" onClick={listarUsuarios}>
        Listar Usuarios
      </button> */}
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
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td> 
              <td>{usuario.correo}</td>
              <td>{usuario.contrasena}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.estado}</td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit', usuario)}>
                  Editar
                </button>
                <button className="eliminar-usuario" onClick={() => openModal('delete', usuario)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <FormAddUsuarios isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default Usuario;
