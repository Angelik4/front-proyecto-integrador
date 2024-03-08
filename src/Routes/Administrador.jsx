import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBuilding, faUser, faTableCellsLarge, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Salas from '../Components/Salas';
import Usuario from '../Components/Usuario';
import Categoria from '../Components/Categoria';
import '../css/Administrador.css';

const Administrador = () => {
  const [activo, setActivo] = useState(null);

  const navigate = useNavigate();

  const handleClick = (opcion) => {
    setActivo(opcion);
    if (opcion === "Salir") {
      navigate("/"); // Redireccionamos al hacer clic en "Salir"
    }
  };

  return (
    <div className="panel">
      <div className="menu">
        <div className="icon-select">
          <FontAwesomeIcon icon={faHouse} style={{ color: '#f2994a' }} />
          <button
            className={activo === "Inicio" ? "activo" : ""}
            onClick={() => handleClick("Inicio")}
          >
            Inicio
          </button>
        </div>
        <div className="icon-select">
          <FontAwesomeIcon icon={faBuilding} style={{ color: '#f2994a' }} />
          <button
            className={activo === "Salas" ? "activo" : ""}
            onClick={() => handleClick("Salas")}
          >
            Salas
          </button>
        </div>
        <div className="icon-select">
          <FontAwesomeIcon icon={faUser} style={{ color: '#f2994a' }} />
          <button
            className={activo === "Usuario" ? "activo" : ""}
            onClick={() => handleClick("Usuario")}
          >
            Usuario
          </button>
        </div>
        <div className="icon-select">
          <FontAwesomeIcon icon={faTableCellsLarge} style={{ color: '#f2994a' }} />
          <button
            className={activo === "Categoria" ? "activo" : ""}
            onClick={() => handleClick("Categoria")}
          >
            Categoria
          </button>
        </div>
        <div className="icon-select">
          <FontAwesomeIcon icon={faSignOutAlt} style={{ color: '#f2994a' }} />
          <button
            className={activo === "Salir" ? "activo" : ""}
            onClick={() => handleClick("Salir")}
          >
            Salir
          </button>
        </div>
      </div>
      <div className="contenido">
        {activo && (
          <>
            {activo === "Inicio" && <p>Contenido de Inicio</p>}
            {activo === "Salas" && <p><Salas /></p>}
            {activo === "Usuario" && <p><Usuario /></p>}
            {activo === "Categoria" && <p><Categoria /></p>}
          </>
        )}
      </div>
    </div>
  );
};

export default Administrador;
