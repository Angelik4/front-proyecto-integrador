import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import sendRequest from '../../utils/SendRequest';

const FormEditUsuario = ({ isOpen, onRequestClose, usuario }) => {
  const [nombre, setNombre] = useState(usuario ? usuario.nombre || '' : '');
  const [apellido, setApellido] = useState(usuario ? usuario.apellido || '' : '');
  const [correo, setCorreo] = useState(usuario ? usuario.correo || '' : '');
  const [contrasena, setContrasena] = useState(usuario ? usuario.contrasena || '' : '');
  const [rolId, setRolId] = useState(usuario ? usuario.rolId || '' : ''); // Aquí se establece el valor del rolId
  const [estado, setEstado] = useState(usuario ? (usuario.estado === 1 ? 'activo' : 'inactivo') : 'activo'); // Aquí se establece el valor del estado
  const [error, setError] = useState(null); // Estado para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const nombreCompleto = nombre + ' ' + apellido;

      const rolesResponse = await sendRequest('GET', 'http://localhost:8081/rol/listar');
      const rolEncontrado = rolesResponse.find((rol) => rol.nombre === rolId);

      if (!rolEncontrado) {
        setError('Rol no encontrado.');
        return;
      }

      const response = await sendRequest('PATCH', `http://localhost:8081/usuario/actualizar/${usuario.id}`, {
        nombre: nombreCompleto,
        correo: correo,
        contrasena: contrasena,
        idTipoIdentificacion: 1,
        numeroIdentificacion: 7854236,
        estado: estado === 'activo' ? 1 : 0,
        idRol: rolEncontrado.id,
      });
      console.log('Respuesta del servidor:', response);
      onRequestClose(); // Cerrar modal después de la actualización exitosa
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      setError('Error al actualizar usuario. Por favor, inténtelo de nuevo.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Editar Usuario"
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <div className="modal-container">
        <button onClick={onRequestClose} className="btn-cerrar">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2>Editar Usuario</h2>
        {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error si existe */}
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
          <button type="submit" className="btn-guardar">Guardar</button>
        </form>
      </div>
    </Modal>
  );
};

export default FormEditUsuario;
