import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "../../../css/FormAddSalas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../utils/SendRequest";
import { uploadFile } from "../../utils/firebase/config";

const FormAddSalas = ({ isOpen, onRequestClose }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);

  useEffect(() => {
    obtenerCategorias();
    obtenerServicios();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await sendRequest(
        "GET",
        "http://localhost:8081/tiposala/listar"
      );
      setCategorias(response);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };
  
  const obtenerServicios = async () => {
    try {
      const response = await sendRequest(
        "GET",
        "http://localhost:8081/servicio/listar"
      );
      setServicios(response);
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
    }
  };

  const handleServiciosChange = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setServiciosSeleccionados([...serviciosSeleccionados, parseInt(id)]);
    } else {
      setServiciosSeleccionados(serviciosSeleccionados.filter(servicioId => servicioId !== parseInt(id)));
    }
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
  };
  try {
    // Envía la solicitud para registrar la sala y obtén el ID de la sala
    const responseSala = await sendRequest("POST", "http://localhost:8081/sala/registrar", sala);
    const idSala = responseSala.id; // Obtén el ID de la sala registrada

    // Envía la solicitud para relacionar los servicios con la sala
    const responseServiciosSala = await sendRequest("POST", "http://localhost:8081/serviciosala/registrar", {
      idServicios: serviciosSeleccionados,
      idSala: idSala
    });

    console.log("Servicios relacionados con la sala:", responseServiciosSala);

    // Sube los archivos y obtén las rutas de las imágenes
    const paths = await Promise.all(archivos.map(uploadFile));

    console.log("Rutas de las imágenes:", paths);

    // Verifica que se hayan subido todas las imágenes correctamente
    if (paths.every(path => typeof path === 'string')) {
      // Aplanar el array de rutas de imágenes
      const imagenes = paths.flat();

      console.log("Rutas de las imágenes a enviar:", imagenes);

      // Envía la solicitud al servidor después de que todas las imágenes se hayan subido correctamente
      const responseImagenes = await sendRequest("POST", "http://localhost:8081/imagen/registrar", imagenes.map((path, index) => ({
        nombre: `imagen_${index}`,
        imagen: path,
        idSala: idSala
      })));

      console.log("Respuesta del registro de imágenes:", responseImagenes);

      onRequestClose(); // Cierra el modal después de realizar todas las operaciones
    } else {
      // Si alguna imagen no se subió correctamente, muestra un mensaje de error
      console.error("Error al subir una o más imágenes");
    }
  } catch (error) {
    console.error("Error al registrar la sala y relacionar los servicios:", error);
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
          <label htmlFor="servicio">Servicios</label>
          <div className="modal-service">
            {Array.isArray(servicios) && servicios.map((servicio) => (
              <div key={servicio.id}>
                <input
                  type="checkbox"
                  id={servicio.id}
                  value={servicio.id}
                  onChange={handleServiciosChange}
                />
                <label htmlFor={servicio.id}>{servicio.nombre}</label>
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