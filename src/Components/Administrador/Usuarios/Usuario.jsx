import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../../css/Panel.css";
import FormAddUsuarios from '../Usuarios/FormAddUsuarios'; // Importa el formulario de agregar usuarios
import FormEditRol from '../Usuarios/FormEditRol'; // Importa el formulario de editar usuarios
import sendRequest from "../../utils/SendRequest";
import Swal from 'sweetalert2';
import Pagination from '../Pagination';
import SearchBar from "../SearchBar";

const Usuario = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosOriginal, setUsuariosOriginal] = useState([]);
  const [usuarioToEdit, setUsuarioToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const openModal = (formType, usuario) => { // Agrega el parámetro formType para determinar qué formulario abrir
    setIsOpen(true);
    setUsuarioToEdit(usuario);
  };

  const closeModal = () => {
    setIsOpen(false);
    setUsuarioToEdit(null);
  };

  useEffect(() => {
    listarUsuarios();
  }, []);

  const listarUsuarios = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/usuario/listar");
      console.log("Usuarios obtenidos:", response);
      if (response && response.length > 0) {
        const formattedUsers = response.map((user) => ({
          id: user.id || '',
          nombre: user.nombre ? user.nombre.split(' ')[0] || '' : '',
          apellido: user.nombre ? user.nombre.split(' ')[1] || '' : '',
          correo: user.correo || '',
          contrasena: '******',
          rol: user.idRol ? user.idRol.nombre : '',
          estado: user.estado === 1 ? 'Activo' : 'Inactivo',
        }));
        setUsuarios(formattedUsers);
        setUsuariosOriginal(response);
      } else {
        console.error('La respuesta no contiene datos válidos:', response);
      }
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const handleDelete = async (usuario) => {
    try {
      if (usuario) {
        const result = await Swal.fire({
          title: `¿Estás seguro de que deseas eliminar al usuario ${usuario.nombre}?`,
          text: "Esta acción no se puede deshacer",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
          const response = await sendRequest("DELETE", `http://localhost:8081/usuario/eliminar/${usuario.id}`);
          console.log("Respuesta del servidor al eliminar:", response);
          listarUsuarios();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (usuario) => {
    openModal('edit', usuario); // Abre el formulario de edición al hacer clic en "Editar"
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setUsuarios(usuariosOriginal);
    } else {
      const filteredUsuarios = usuariosOriginal.filter((usuario) => {
        const idIncludesTerm = usuario.id.toString().includes(searchTerm);
        return (
          usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || idIncludesTerm
        );
      });
      setUsuarios(filteredUsuarios);
    }
  };

  const handleUserChange = () => {
    listarUsuarios();
    closeModal();
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = usuarios.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <SearchBar onSearch={handleSearch} />
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
          {currentItems.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.correo}</td>
              <td>{user.contrasena}</td>
              <td>{user.rol}</td>
              <td>{user.estado}</td>
              <td>
                <button className="editar-usuario" onClick={() => handleEdit(user)}>Editar</button>
                <button className="eliminar-usuario" onClick={() => handleDelete(user)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {usuarios.length > itemsPerPage && (
        <Pagination itemsPerPage={itemsPerPage} totalItems={usuarios.length} onPageChange={paginate} />
      )}
      {modalIsOpen && !usuarioToEdit && <FormAddUsuarios isOpen={modalIsOpen} onRequestClose={closeModal} onUserChange={handleUserChange} />}
      {modalIsOpen && usuarioToEdit && <FormEditRol isOpen={modalIsOpen} onRequestClose={closeModal} usuarioToEdit={usuarioToEdit} onUserChange={handleUserChange} />}
    </div>
  );
};

export default Usuario;