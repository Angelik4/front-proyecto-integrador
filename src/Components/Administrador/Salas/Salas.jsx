import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "../../../css/Panel.css";
import data from "../../../api/data.json";
import FormAddSalas from "../Salas/FormAddSalas";
import FormEdit from "./FormEdit";
import FormDelete from "./FormDelete";
import SearchBar from "../SearchBar";

const Salas = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [filteredData, setFilteredData] = useState(data.products)

  const openModal = (actionType) => {
    setIsOpen(true);
    if (actionType === 'edit') {
      setIsEditing(true);
      setIsDeleting(false);
    } else if (actionType === 'delete') {
      setIsEditing(false);
      setIsDeleting(true);
    } else {
      setIsEditing(false);
      setIsDeleting(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsEditing(false);
    setIsDeleting(false);
  };

  return (
    <div className="Ct-Tabla">
      <div className="buscador-container">
        <SearchBar data={data.products} setFilteredData={setFilteredData} />
        <button className="agregar-usuario" onClick={() => openModal('add')}>
          <FontAwesomeIcon
            icon={faUserPlus}
            style={{ color: "#fff", marginRight: "5px" }}
          />
          Agregar Sala
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>IMAGEN</th>
            <th>DESCRIPCION</th>
            <th>CATEGORIA</th>
            <th>CARACTERISTICAS</th>
            <th>ACCION</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.slice(0, 4).map((sala, index) => (
            <tr key={index}>
              <td>{sala.id}</td>
              <td>{sala.nombre}</td>
              <td>
                <img src={sala.galery[0]} alt="" />
              </td>
              <td>{sala.descripcion}</td>
              <td>{sala.categoria}</td>
              <td>
                <ul>
                  {sala.servicios.map((servicio, index) => (
                    <li key={index}>{servicio}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button className="editar-usuario" onClick={() => openModal('edit')}>Editar</button>
                <button className="eliminar-usuario" onClick={() => openModal('delete')}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && <FormEdit isOpen={modalIsOpen} onRequestClose={closeModal} />}
      {isDeleting && <FormDelete isOpen={modalIsOpen} onRequestClose={closeModal} itemType="sala" />}
      {!isEditing && !isDeleting && <FormAddSalas isOpen={modalIsOpen} onRequestClose={closeModal} />}
    </div>
  );
};

export default Salas;
