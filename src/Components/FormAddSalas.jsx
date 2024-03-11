import React, { useState } from "react";
import Modal from "react-modal";
import "../css/FormAddSalas.css";

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
  
    const handleArchivoChange = (e) => {
      const files = Array.from(e.target.files);
      setArchivos([...archivos, ...files]);
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
                  id="aire"
                  checked={servicios.aireAcondicionado}
                  onChange={handleServiciosChange}
                />
                <label htmlFor="aire">Aire acondicionado</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="guarderiaPet"
                  checked={servicios.guarderiaMascotas}
                  onChange={handleServiciosChange}
                />
                <label htmlFor="guarderiaPet">Guardería mascotas</label>
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

          <label htmlFor="archivo">Adjuntar archivo</label>
          <input
            type="file"
            id="archivo"
            multiple
            onChange={handleArchivoChange}
          />

          {/* Lista de archivos seleccionados */}
          <ul>
            {archivos.map((archivo, index) => (
              <li key={index}>
                {archivo.name}
                <button
                  type="button"
                  onClick={() => handleRemoveArchivo(index)}
                >
                  Eliminar
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
