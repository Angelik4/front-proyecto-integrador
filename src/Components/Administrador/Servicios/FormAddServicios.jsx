import React, { useState } from "react";
import Modal from "react-modal";
import "../../../css/FormAddSalas.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const FormAddServicios = ({ isOpen, onRequestClose }) => {
  const [servicios, setServicios] = useState({
    proyector: false,
    wifi: false,
    aireAcondicionado: false,
    guarderiaMascotas: false,
    guarderiaNinos: false,
    cafeteria: false,
  });

  const handleServiciosChange = (e) => {
    const { id, checked } = e.target;
    setServicios((prevServicios) => ({
      ...prevServicios,
      [id]: checked,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear el objeto con los valores del formulario
    const sala = {
      servicios,
    };
    console.log("Sala guardada:", sala);
    onRequestClose();
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
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Agregar Sala"
        ariaHideApp={false}
        style={customStyles}
      >
        <div className="modal-container">
          <button onClick={onRequestClose} className="btn-cerrar">
            {" "}
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="servicios">
              <h3>Agregar Servicios</h3>
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
          </form>
        </div>
      </Modal>
    </>
  );
};

export default FormAddServicios;
