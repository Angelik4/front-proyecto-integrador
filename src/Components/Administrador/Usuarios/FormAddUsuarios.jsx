import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import sendRequest from "../../utils/SendRequest";

const FormAddUsuarios = ({ isOpen, onRequestClose,updateTableData  }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rolId, setRolId] = useState(""); 
    const [estado, setEstado] = useState("activo"); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const nombreCompleto = nombre + " " + apellido;
            
            const rolesResponse = await sendRequest("GET", "http://localhost:8081/rol/listar");
            const rolEncontrado = rolesResponse.find((rol) => rol.nombre === rolId);

            if (!rolEncontrado) {
                console.error("Rol no encontrado.");
                return;
            }

            const response = await sendRequest("POST", "http://localhost:8081/usuario/registrar", {
                nombre: nombreCompleto,
                correo: correo,
                contrasena: contrasena,
                idTipoIdentificacion: 1,
                numeroIdentificacion: 7854236,
                estado: estado === "activo" ? 1 : 0,
                idRol: rolEncontrado.id,
            });
            console.log("Respuesta del servidor:", response);
            onRequestClose();
            updateTableData();
        } catch (error) {
            console.error(error);
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
            contentLabel="Agregar Categoría"
            ariaHideApp={false}
            style={customStyles}
        >
            <div className="modal-container">
                <button onClick={onRequestClose} className="btn-cerrar">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2>Agregar Usuario</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                placeholder="Nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido">Apellido</label>
                            <input
                                type="text"
                                id="apellido"
                                placeholder="Apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="correo">Correo</label>
                            <input
                                type="text"
                                id="correo"
                                placeholder="Correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contrasena">Contraseña</label>
                            <input
                                type="password"
                                id="contrasena"
                                placeholder="Contraseña"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="rol">Rol</label>
                            <select
                                id="rol"
                                value={rolId}
                                onChange={(e) => setRolId(e.target.value)}
                            >
                                <option value="">Seleccionar Rol</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Usuario Registrado">Usuario Registrado</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="estado">Estado</label>
                            <select
                                id="estado"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
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

export default FormAddUsuarios;
