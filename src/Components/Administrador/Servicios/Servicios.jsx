import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../../css/Panel.css";
import FormAddServicio from '../Servicios/FormAddServicios';
import sendRequest from "../../utils/SendRequest";
import Swal from 'sweetalert2';
import Pagination from '../Pagination';

const Servicios = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [servicios, setServicios] = useState([]);
  const [actionType, setActionType] = useState("");
  const [servicioToEdit, setServicioToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const openModal = (actionType, servicio) => {
    setIsOpen(true);
    setActionType(actionType);
    setServicioToEdit(servicio);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActionType("");
    setServicioToEdit(null);
  };

  useEffect(() => {
    listarServicios();
  }, []);

  const listarServicios = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/servicio/listar");
      console.log("Servicios obtenidos:", response);
      setServicios(response);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
    }
  };

  const handleDelete = async (servicio) => {
    try {
      if (servicio) {
        const result = await Swal.fire({
          title: `¿Estás seguro de que deseas eliminar el servicio ${servicio.nombre}?`,
          text: "Esta acción no se puede deshacer",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar',
          cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
          const response = await sendRequest("DELETE", `http://localhost:8081/servicio/eliminar/${servicio.id}`);
          console.log("Respuesta del servidor al eliminar:", response);
          listarServicios();
          closeModal();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = servicios.slice(indexOfFirstItem, indexOfLastItem);

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
            Agregar Servicio
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>ESTADO</th>
            <th>ACCION</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((servicio) => (
            <tr key={servicio.id}>
              <td>{servicio.id}</td>
              <td>{servicio.nombre}</td>
              <td>{servicio.estado === 1 ? "Activo" : "Inactivo"}</td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit', servicio)}>Editar</button>
                <button className="eliminar-usuario" onClick={() => handleDelete(servicio)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {servicios.length > itemsPerPage && (
      <Pagination itemsPerPage={itemsPerPage} totalItems={servicios.length} paginate={paginate} />
      )}
      <FormAddServicio isOpen={modalIsOpen} onRequestClose={closeModal} actionType={actionType} servicioToEdit={servicioToEdit} onServicioChange={listarServicios} />
    </div>
  );
};
export default Servicios;