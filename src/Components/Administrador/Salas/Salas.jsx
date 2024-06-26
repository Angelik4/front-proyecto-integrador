import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../css/Panel.css";
import FormAddSalas from "../Salas/FormAddSalas";
import sendRequest from "../../utils/SendRequest";
import Swal from "sweetalert2";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";

const Salas = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [salas, setSalas] = useState([]);
  const [salasOriginal, setSalasOriginal] = useState([]);
  const [actionType, setActionType] = useState("");
  const [salaToEdit, setSalaToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const tableRef = useRef(null);

  const openModal = (actionType, sala) => {
    setIsOpen(true);
    setActionType(actionType);
    setSalaToEdit(sala);
  };

  const closeModal = () => {
    setIsOpen(false);
    setActionType("");
    setSalaToEdit(null);
  };

  useEffect(() => {
    listarSalas();
  }, []);

  const listarSalas = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/sala/listar");
      setSalas(response);
      setSalasOriginal(response);
      console.log(response);
    } catch (error) {
      console.error("Error al obtener las salas:", error);
    }
  };
  const handleFormSubmitSuccess = () => {
    // Actualiza la lista de productos
    listarSalas();
  };
  const handleDelete = async (sala) => {
    try {
      if (sala) {
        const result = await Swal.fire({
          title: `¿Estás seguro de que deseas eliminar la sala ${sala.nombre}?`,
          text: "Esta acción no se puede deshacer",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sí, eliminar",
          cancelButtonText: "Cancelar",
        });

        if (result.isConfirmed) {
          await sendRequest("DELETE", `http://localhost:8081/sala/eliminar/${sala.id}`);
          listarSalas();
          closeModal();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (sala) => {
    openModal("edit", sala);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setSalas(salasOriginal);
    } else {
      const filteredSalas = salasOriginal.filter((sala) => {
        const idIncludesTerm = sala.id.toString().includes(searchTerm);
        return (
          sala.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || idIncludesTerm
        );
      });
      setSalas(filteredSalas);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <div className="content-buscador">
          <SearchBar onSearch={handleSearch} />
          <button className="agregar-usuario" onClick={() => openModal("add", null)}>
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
            <th>IMAGENES</th>
            <th>SERVICIOS</th>
            <th>CAPACIDAD</th>
            <th>ACCION</th>
          </tr>
        </thead>
        <tbody>
          {salas
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((sala) => (
              <tr key={sala.id}>
                <td>{sala.id}</td>
                <td>{sala.nombre}</td>
                <td>{sala.descripcion}</td>
                <td>{sala.tipoSala.nombre}</td>
                <td className="container-imagenes">
                  {sala.imagenes.map((imagen, index) => (
                    <div className="imagen" key={index}>
                      <img src={Object.values(imagen)[0]} alt={`Imagen ${index + 1}`} />
                    </div>
                  ))}
                </td>
                <td>
                  {sala.servicios.map((servicio, index) => (
                    <li key={index}>{Object.values(servicio)[0]}</li>
                  ))}
                </td>
                <td>{sala.capacidad}</td>
                <td>
                  <button className="editar-usuario" onClick={() => handleEdit(sala)}>
                    Editar
                  </button>
                  <button className="eliminar-usuario" onClick={() => handleDelete(sala)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {salas.length > itemsPerPage && (
        <Pagination
          totalItems={salas.length}
          itemsPerPage={itemsPerPage}
          onPageChange={paginate}
        />
      )}
      <FormAddSalas
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        actionType={actionType}
        salaToEdit={salaToEdit}
        onSalaChange={listarSalas}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
    </div>
  );
};

export default Salas;