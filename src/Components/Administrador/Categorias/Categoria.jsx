// Categoria.js
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import "../../../css/Panel.css";
import FormAddCategoria from '../Categorias/FormAddCategoria';
import sendRequest from "../../utils/SendRequest"; // Importa la función para enviar solicitudes
import Swal from 'sweetalert2';
import Pagination from '../Pagination'; // Importa el componente de paginación

const Categoria = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [tipoSalas, setTipoSalas] = useState([]);
  const [actionType, setActionType] = useState(""); // Definir estado para el tipo de acción (edit, delete)
  const [categoriaToEdit, setCategoriaToEdit] = useState(null); // Definir estado para la categoría a editar
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const tableRef = useRef(null); // Referencia a la tabla

  const openModal = (actionType, categoria) => {
    setIsOpen(true);
    setActionType(actionType); // Establecer el tipo de acción
    setCategoriaToEdit(categoria); // Establecer la categoría a editar o eliminar
  };

  const closeModal = () => {
    setIsOpen(false);
    setActionType(""); // Reiniciar el tipo de acción al cerrar el modal
    setCategoriaToEdit(null); // Reiniciar la categoría a editar al cerrar el modal
  };

  useEffect(() => {
    listarCategorias();
  }, []);

  const listarCategorias = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/tiposala/listar");
      console.log("Categorías obtenidas:", response);
      setTipoSalas(response);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const handleDelete = async (categoria) => {
    try {
      if (categoria) {
        // Mostrar SweetAlert de confirmación
        const result = await Swal.fire({
          title: `¿Estás seguro de que deseas eliminar la categoría ${categoria.nombre}?`,
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
          const response = await sendRequest("DELETE", `http://localhost:8081/tiposala/eliminar/${categoria.id}`);
          console.log("Respuesta del servidor al eliminar:", response);
          // Después de eliminar una categoría, llama a la función listarCategorias para actualizar la lista de categorías en el componente
          listarCategorias();
          closeModal(); // Cierra el modal después de eliminar la categoría
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tipoSalas.slice(indexOfFirstItem, indexOfLastItem);

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
            Agregar Categoria
          </button>
        </div>
      </div>
      <table ref={tableRef}>
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
          {currentItems.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td>{categoria.descripcion}</td>
              <td><img src={categoria.imagen} alt={categoria.nombre} /></td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit', categoria)}>Editar</button>
                <button className="eliminar-usuario" onClick={() => handleDelete(categoria)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination itemsPerPage={itemsPerPage} totalItems={tipoSalas.length} paginate={paginate} />
      <FormAddCategoria isOpen={modalIsOpen} onRequestClose={closeModal} actionType={actionType} categoriaToEdit={categoriaToEdit} onCategoriaChange={listarCategorias} />
    </div>
  );
};

export default Categoria;