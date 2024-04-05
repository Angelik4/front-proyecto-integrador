import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import sendRequest from "./SendRequest";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import '../../css/Navbar.css';

const Profile = ({ isOpen, onRequestClose }) => {
    const [usuarios, setUsuarios] = useState([]);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [avatar, setAvatar] = useState("");
    const token = localStorage.getItem('token');
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

    useEffect(() => {
        const obtenerUsuarioAutenticado = async () => {
            try {
                const decodedToken = jwtDecode(token);
                const email = decodedToken?.correo;
                
                const response = await sendRequest("GET", "http://localhost:8081/usuario/listar");

                if (response && response.length > 0) {
                    const formattedUsers = response.map((user) => ({
                        id: user.id || '',
                        nombre: user.nombre ? user.nombre.split(' ')[0] || '' : '',
                        apellido: user.nombre ? user.nombre.split(' ')[1] || '' : '',
                        correo: user.correo || '',
                    }));
                    setUsuarios(formattedUsers);

                    const usuarioEncontrado = formattedUsers.find(usuario => usuario.correo === email);

                    if (usuarioEncontrado) {
                        const iniciales = obtenerIniciales(usuarioEncontrado.nombre, usuarioEncontrado.apellido);

                        setAvatar(iniciales);
                        setUsuarioAutenticado(usuarioEncontrado);
                        setNombre(usuarioEncontrado.nombre);
                        setApellido(usuarioEncontrado.apellido);
                        setCorreo(usuarioEncontrado.correo);
                        //onRequestClose();
                    }
                } else {
                    console.error('La respuesta no contiene datos válidos:', response);
                }
            } catch (error) {
                console.error("Error al obtener los usuarios:", error);
            }
        };

        obtenerUsuarioAutenticado();
    }, [token]);

    const obtenerIniciales = (nombre, apellido) => {
        const inicialNombre = nombre[0].charAt(0).toUpperCase();
        const inicialApellido = apellido[0].charAt(0).toUpperCase();
        return `${inicialNombre}${inicialApellido}`;
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
            contentLabel="Profile"
            ariaHideApp={false}
            style={customStyles}
        >
            <div className="modal-container">
                <button onClick={onRequestClose} className="btn-cerrar">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className='content-avatar'>
                    <div className="ct-avatar">{avatar}</div>
                </div>

                <h1>{nombre} {apellido} </h1>
                <h2>{correo}</h2>

            </div>
        </Modal>
    );
}
export default Profile