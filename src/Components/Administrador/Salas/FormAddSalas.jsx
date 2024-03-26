import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../../css/FormAddSalas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../utils/SendRequest";

const FormAddSalas = ({ isOpen, onRequestClose }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [servicios, setServicios] = useState({
    proyector: false,
    wifi: false,
    aireAcondicionado: false,
    guarderiaMascotas: false,
    guarderiaNinos: false,
    cafeteria: false,
  });

  /*   useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await sendRequest("GET", "http://localhost:8081/tiposala/listar");
        console.log("Categorías obtenidas:", response);
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    };

    obtenerCategorias();
  }, []); */
  const handleServiciosChange = (e) => {
    const { id, checked } = e.target;
    setServicios((prevServicios) => ({
      ...prevServicios,
      [id]: checked,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Obtener el id de la categoría seleccionada
    const categoriaId = categorias.find((c) => c.nombre === categoria)?.id;

    // Crear el objeto con los valores del formulario
    const sala = {
      nombre,
      descripcion,
      capacidad,
      tipoSala: categoriaId,
      disponible: 1,
      estado: 1,
      promedioCalificacion: 0,
      servicios,
    };

    try {
      const response = await sendRequest(
        "POST",
        "http://localhost:8081/sala/registrar",
        sala
      );
      console.log("Sala guardada:", response);
      onRequestClose();
    } catch (error) {
      console.error("Error al guardar la sala:", error);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Agregar Sala"
      ariaHideApp={false}
      style={customStyles}
    >
      <div className="modal-container">
        <button onClick={onRequestClose} className="btn-cerrar">
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2>Agregar Sala</h2>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nueva Sala"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            rows={4}
            placeholder="Descripción de la sala"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>

          <label htmlFor="capacidad">Capacidad</label>
          <input
            type="number"
            id="capacidad"
            placeholder="Capacidad de la sala"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
          />

          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          <div className="modal-service">
            <div>
              <input
                type="checkbox"
                id="proyector"
                checked={servicios.proyector}
                onChange={handleServiciosChange}
              />
              <label htmlFor="proyector">Proyector</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="wifi"
                checked={servicios.wifi}
                onChange={handleServiciosChange}
              />
              <label htmlFor="wifi">Wifi</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="aireAcondicionado"
                checked={servicios.aireAcondicionado}
                onChange={handleServiciosChange}
              />
              <label htmlFor="aireAcondicionado">Aire acondicionado</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="guarderiaMascotas"
                checked={servicios.guarderiaMascotas}
                onChange={handleServiciosChange}
              />
              <label htmlFor="guarderiaMascotas">Guardería mascotas</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="guarderiaNinos"
                checked={servicios.guarderiaNinos}
                onChange={handleServiciosChange}
              />
              <label htmlFor="guarderiaNinos">Guardería niños</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="cafeteria"
                checked={servicios.cafeteria}
                onChange={handleServiciosChange}
              />
              <label htmlFor="cafeteria">Cafetería</label>
            </div>
          </div>
          <button type="submit" className="btn-guardar">
            Guardar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FormAddSalas;
