import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../../../css/Panel.css';
import FormAddUsuarios from '../Usuarios/FormAddUsuarios';
import sendRequest from '../../utils/SendRequest';
import Pagination from '../Pagination';

const Usuario = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [userToEdit, setUserToEdit] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const openModal = (actionType, user) => {
    setModalIsOpen(true);
    setActionType(actionType);
    setUserToEdit(user);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setActionType("");
    setUserToEdit(null);
  };

  const listUsers = async () => {
    try {
      const response = await sendRequest('GET', 'http://localhost:8081/usuario/listar');
      console.log('Usuarios obtenidos:', response);
      if (response && response.length > 0) {
        const formattedUsers = response.map((user) => ({
          id: user.id || '',
          nombre: user.nombre || '',
          apellido: user.nombre ? user.nombre.split(' ')[1] || '' : '',
          correo: user.correo || '',
          contrasena: '******',
          rol: user.idRol ? user.idRol.nombre : '',
          estado: user.estado === 1 ? 'Activo' : 'Inactivo',
        }));
        setUsers(formattedUsers);
      } else {
        console.error('La respuesta no contiene datos válidos:', response);
      }
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
    }
  };

  useEffect(() => {
    listUsers();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

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
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.correo}</td>
              <td>{user.rol}</td>
              <td>{user.estado}</td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit', user)}>Editar</button>
                <button className="eliminar-usuario" onClick={() => openModal('delete', user)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={users.length} paginate={paginate} />
      <FormAddUsuarios isOpen={modalIsOpen} onRequestClose={closeModal} actionType={actionType} userToEdit={userToEdit} onUserChange={listUsers} />
    </div>
  );
};

export default Usuario;