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
  const [archivos, setArchivos] = useState([]);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await sendRequest("GET", "http://localhost:8081/tiposala/listar");
      setCategorias(response);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const handleServiciosChange = (e) => {
    const { id, checked } = e.target;
    setServicios((prevServicios) => ({
      ...prevServicios,
      [id]: checked,
    }));
  };

  const handleArchivoChange = (e) => {
    const files = Array.from(e.target.files);
    setArchivos([...archivos, ...files]);
  };

  const handleRemoveArchivo = (index) => {
    const newArchivos = archivos.filter((_, i) => i !== index);
    setArchivos(newArchivos);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriaId = categorias.find((c) => c.nombre === categoria)?.id;
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
      const response = await sendRequest("POST", "http://localhost:8081/sala/registrar", sala);
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
            placeholder="Nombre de la sala"
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
            {Object.entries(servicios).map(([servicio, checked], index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={servicio}
                  checked={checked}
                  onChange={handleServiciosChange}
                />
                <label htmlFor={servicio}>{servicio}</label>
              </div>
            ))}
          </div>

          <div className="content-url-img">
            <label htmlFor="url-imagen">Selecciona las imágenes</label>
            <div className="url-img-add">
              <input
                type="file"
                id="archivo"
                multiple
                onChange={handleArchivoChange}
              />
            </div>
          </div>
          <ul className="list-url-img">
            {archivos.map((archivo, index) => (
              <li key={index}>
                <span>{archivo.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveArchivo(index)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </li>
            ))}
          </ul>
          <button type="submit" className="btn-guardar">
            Guardar
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default FormAddSalas;