import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../../css/Panel.css";
import FormAddSalas from '../Salas/FormAddSalas'; // Importa el formulario para agregar salas
import sendRequest from "../../utils/SendRequest"; // Importa la función para enviar solicitudes
import Swal from 'sweetalert2';
import Pagination from '../Pagination'; // Importa el componente de paginación

const Salas = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [salas, setSalas] = useState([]);
  const [actionType, setActionType] = useState(""); // Definir estado para el tipo de acción (edit, delete)
  const [salaToEdit, setSalaToEdit] = useState(null); // Definir estado para la sala a editar
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const tableRef = useRef(null); // Referencia a la tabla

  const openModal = (actionType, sala) => {
    setIsOpen(true);
    setActionType(actionType); // Establecer el tipo de acción
    setSalaToEdit(sala); // Establecer la sala a editar o eliminar
  };

  const closeModal = () => {
    setIsOpen(false);
    setActionType(""); // Reiniciar el tipo de acción al cerrar el modal
    setSalaToEdit(null); // Reiniciar la sala a editar al cerrar el modal
  };

  useEffect(() => {
    listarSalas();
  }, []);

  const listarSalas = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/sala/listar");
      console.log("Salas obtenidas:", response);
      setSalas(response);
    } catch (error) {
      console.error("Error al obtener las salas:", error);
    }
  };

  const handleDelete = async (sala) => {
    try {
      if (sala) {
        // Mostrar SweetAlert de confirmación
        const result = await Swal.fire({
          title: `¿Estás seguro de que deseas eliminar la sala ${sala.nombre}?`,
          text: "Esta acción no se puede deshacer",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        });
  
        // Si el usuario confirma la eliminación
        if (result.isConfirmed) {
          const response = await sendRequest("DELETE", `http://localhost:8081/sala/eliminar/${sala.id}`);
          console.log("Respuesta del servidor al eliminar:", response);
          // Después de eliminar una sala, llama a la función listarSalas para actualizar la lista de salas en el componente
          listarSalas();
          closeModal(); // Cierra el modal después de eliminar la sala
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = salas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <div className="content-buscador">
          <div className="buscador">
            <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
            <input type="text" placeholder="Buscar por Nombre/ID" />
          </div>
          <button className="agregar-usuario" onClick={() => openModal('add', null)}>
            <FontAwesomeIcon icon={faUserPlus} style={{ color: "#fff", marginRight: "5px" }} />
            Agregar Sala
          </button>
        </div>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>DESCRIPCION</th>
            <th>CATEGORIA</th>
            <th>ACCION</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((sala) => (
            <tr key={sala.id}>
              <td>{sala.id}</td>
              <td>{sala.nombre}</td>
              <td>{sala.descripcion}</td>
              <td>{sala.categoria}</td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit', sala)}>Editar</button>
                <button className="eliminar-usuario" onClick={() => handleDelete(sala)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {salas.length > itemsPerPage && (
        <Pagination itemsPerPage={itemsPerPage} totalItems={salas.length} paginate={paginate} />
      )}
      <FormAddSalas isOpen={modalIsOpen} onRequestClose={closeModal} actionType={actionType} salaToEdit={salaToEdit} onSalaChange={listarSalas} />
    </div>
  );
};

export default Salas;