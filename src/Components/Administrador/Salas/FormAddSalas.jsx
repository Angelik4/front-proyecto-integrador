import React, { useState } from "react";
import Modal from "react-modal";
import "../../../css/FormAddSalas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FormAddSalas = ({ isOpen, onRequestClose }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [servicios, setServicios] = useState({
    proyector: false,
    wifi: false,
    aireAcondicionado: false,
    guarderiaMascotas: false,
    guarderiaNinos: false,
    cafeteria: false,
  });
  const [archivos, setArchivos] = useState([]);
  const [inputArchivo, setInputArchivo] = useState(""); // Estado para el input de URL de imagen

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear el objeto con los valores del formulario
    const sala = {
      nombre,
      descripcion,
      categoria,
      servicios,
      archivos,
    };
    console.log("Sala guardada:", sala);
    onRequestClose();
  };

  const handleServiciosChange = (e) => {
    const { id, checked } = e.target;
    setServicios((prevServicios) => ({
      ...prevServicios,
      [id]: checked,
    }));
  };

  const handleArchivoChange = () => {
    // Agregar la URL de imagen a la lista de archivos
    if (inputArchivo.trim() !== "") {
      setArchivos([...archivos, inputArchivo]);
      setInputArchivo(""); // Limpiar el input de URL de imagen
    }
  };

  const handleRemoveArchivo = (index) => {
    const newArchivos = archivos.filter((_, i) => i !== index);
    setArchivos(newArchivos);
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
      <button onClick={onRequestClose} className="btn-cerrar"> <FontAwesomeIcon icon={faXmark} /></button>
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

          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="VIP">VIP</option>
            <option value="GENERAL">GENERAL</option>
            <option value="PET FRIENDLY">PET FRIENDLY</option>
            <option value="SOCIAL">SOCIAL</option>
          </select>

          <div className="servicios">
            <h3>Servicios</h3>
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
          </div>

          {/* Input para URL de imagen */}
          <div className="content-url-img">
            <label htmlFor="url-imagen">URL de imagen</label>
            <div className="url-img-add">
              <input
                type="text"
                id="url-imagen"
                placeholder="URL de la imagen"
                value={inputArchivo}
                onChange={(e) => setInputArchivo(e.target.value)}
              />
              <button
                type="button"
                onClick={handleArchivoChange}
                className="btn-agregar"
              >
                Agregar
              </button>
            </div>
          </div>

          {/* Lista de archivos seleccionados */}
          <ul className="list-url-img">
            {archivos.map((archivo, index) => (
              <li key={index}>
                <span>{archivo}</span>
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
