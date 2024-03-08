import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBuilding, faUser, faTableCellsLarge, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MaterialTable from 'material-table';
import '../css/Administrador.css';

const Administrador = () => {
  const [activo, setActivo] = useState(null);

  const handleClick = (opcion) => {
    setActivo(opcion);
  };

  const columnas = [
    {
        title: 'Id'
        , field: 'id',
        type: 'numeric'
  },
    {
        title: 'Nombre'
        , field: 'nombre',
  },
    {
        title: 'Apellido'
        , field: 'apellido',
}, 
];

const data=[
    {id: 1, nombre: 'Gaby', apellido: 'Hernández'},
    {id: 2, nombre: 'Gabriela', apellido: 'Hdez'},
    {id: 3, nombre: 'Esmeralda', apellido: 'Benitez'},
    {id: 4, nombre: 'Esmeraldita', apellido: 'De Hernández'},
]


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
            onClick={() => handleClick("salas")}
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
            {activo === "Salas" && <p>Contenido de Salas</p>}
            {activo === "Usuario" && <p>Contenido de Usuario</p>}
            {activo === "Categoria" && <p>Contenido de Categoria</p>}
            {activo === "Salir" && <p>Contenido de Salir</p>}
          </>
        )}
      </div>
      <div className="seleccion">
        {
        <MaterialTable
        columns={columnas}
        data={data}
        />
        }
      </div>
    </div>
  );
};

export default Administrador;