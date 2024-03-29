// Usuario.js
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../../css/Panel.css';
import FormAddUsuarios from '../Usuarios/FormAddUsuarios';
import sendRequest from '../../utils/SendRequest';
import FormEditUsuario from './FormEditUsuario';
import FormDelete from "../Salas/FormDelete";
import Pagination from '../Pagination'; 

const Usuario = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [usuarios, setUsuarios] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const openModal = (actionType, usuario) => {
    setIsOpen(true);
    if (actionType === 'edit') {
      setIsEditing(true);
      setIsDeleting(false);
      setSelectedUser(usuario);
    } else if (actionType === 'delete') {
      setIsEditing(false);
      setIsDeleting(true);
      setSelectedUser(usuario);
    } else {
      setIsEditing(false);
      setIsDeleting(false);
      setSelectedUser(null);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditing(false);
    setIsDeleting(false);
    setSelectedUser(null);
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
        return usuariosFormateados;
      } else {
        console.error('La respuesta no contiene datos válidos:', response);
        return [];
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      return [];
    }
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <div className="buscador">
          <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
          <input type="text" placeholder="Buscar por Nombre/ID" />
        </div>
        <button className="agregar-usuario" onClick={() => openModal('add')}>
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
          {currentItems.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.contrasena}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.estado}</td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit', usuario)}>Editar</button>
                <button className="eliminar-usuario" onClick={() => openModal('delete', usuario)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={usuarios.length} paginate={paginate} />
      {isEditing && <FormEditUsuario isOpen={modalIsOpen} onRequestClose={closeModal} usuario={selectedUser} />}
      {isDeleting && <FormDelete isOpen={modalIsOpen} onRequestClose={closeModal} itemType="usuario" />}
      {!isEditing && !isDeleting && <FormAddUsuarios isOpen={modalIsOpen} onRequestClose={closeModal} />}
    </div>
  );
};

export default Usuario;