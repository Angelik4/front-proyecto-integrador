import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faBuilding,faUser,faTableCellsLarge,faSignOutAlt,faImage} from "@fortawesome/free-solid-svg-icons";
import Salas from "../Components/Administrador/Salas/Salas";
import Usuario from "../Components/Administrador/Usuarios/Usuario";
import Categoria from "../Components/Administrador/Categorias/Categoria";
import "../css/Administrador.css";
import Servicios from "../Components/Administrador/Servicios/Servicios";
import { useMediaQuery } from 'react-responsive';
import Swal from "sweetalert2";

const Administrador = () => {
  const [activo, setActivo] = useState("Salas"); // Establecer "Salas" como activo al cargar la página
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" }); // Detectar si es un dispositivo móvil
  const navigate = useNavigate();

  useEffect(() => {
    if (isMobile) {
      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'Lo sentimos, la vista de administrador no está disponible en dispositivos móviles.',
        confirmButtonText: 'Entendido',
      });
    }
  }, [isMobile]);

  const handleClick = (opcion) => {
    if (opcion === "Salir") {
      navigate("/"); // Redireccionamos al hacer clic en "Salir"
    } else {
      setActivo(opcion); // Establecer la nueva opción como activa
    }
  };

  if (isMobile) {

    return (
      <div>
        <p>
          Lo sentimos, la vista de administrador no está disponible en
          dispositivos móviles.
        </p>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="menu">
        <div className="icon-select">
          <FontAwesomeIcon icon={faBuilding} style={{ color: "#f2994a" }} />
          <button
            className={`icon-button ${activo === "Salas" ? "activo" : ""}`}
            onClick={() => handleClick("Salas")}
          >
            Salas
          </button>
        </div>
        <div className="icon-select">
          <FontAwesomeIcon icon={faUser} style={{ color: "#f2994a" }} />
          <button
            className={`icon-button ${activo === "Usuario" ? "activo" : ""}`}
            onClick={() => handleClick("Usuario")}
          >
            Usuario
          </button>
        </div>
        <div className="icon-select">
          <FontAwesomeIcon
            icon={faTableCellsLarge}
            style={{ color: "#f2994a" }}
          />
          <button
            className={`icon-button ${activo === "Categoria" ? "activo" : ""}`}
            onClick={() => handleClick("Categoria")}
          >
            Categoria
          </button>
        </div>
        <div className="icon-select">
          <FontAwesomeIcon icon={faImage} style={{ color: "#f2994a" }} />
          <button
            className={`icon-button ${activo === "Servicios" ? "activo" : ""}`}
            onClick={() => handleClick("Servicios")}
          >
            Servicios
          </button>
        </div>
        <div className="icon-select">
          <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#f2994a" }} />
          <button
            className={`icon-button ${activo === "Salir" ? "activo" : ""}`}
            onClick={() => handleClick("Salir")}
          >
            Salir
          </button>
        </div>
      </div>
      <div className="contenido">
        {activo && (
          <>
            {activo === "Salas" && <Salas />}
            {activo === "Usuario" && <Usuario />}
            {activo === "Categoria" && <Categoria />}
            {activo === "Servicios" && <Servicios />}
          </>
        )}
      </div>
    </div>
  );
};

export default Administrador;
