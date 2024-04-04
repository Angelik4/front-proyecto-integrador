import React, { useState, useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { jwtDecode } from 'jwt-decode';
import sendRequest from "./SendRequest";

export default function LetterAvatars() {
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
    const [avatarTexto, setAvatarTexto] = useState('NP');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const obtenerUsuarioAutenticado = async () => {
            try {
                const decodedToken = jwtDecode(token);
                const email = decodedToken?.correo;
                console.log("token, decodificado", decodedToken);
                console.log(email);

                // Buscar el usuario autenticado en la lista de usuarios
                const response = await sendRequest("GET", "http://localhost:8081/usuario/listar");
                console.log("Usuarios obtenidos:", response);
                if (response && response.length > 0) {
                    const formattedUsers = response.map((user) => ({
                        id: user.id || '',
                        nombre: user.nombre ? user.nombre.split(' ')[0] || '' : '',
                        apellido: user.nombre ? user.nombre.split(' ')[1] || '' : '',
                        correo: user.correo || '',
                    }));
                    setUsuarios(formattedUsers);
                    console.log("Usuarios formateados:", formattedUsers)

                    const usuarioEncontrado = formattedUsers.find(usuario => usuario.correo === email);
                    console.log("Usuarios encontrado:", usuarioEncontrado)
                    if (usuarioEncontrado) {
                        const iniciales = obtenerIniciales(usuarioEncontrado.nombre, usuarioEncontrado.apellido);

                        setAvatarTexto(iniciales);
                        setUsuarioAutenticado(usuarioEncontrado);
                        console.log("Usuarios iniciales", iniciales)
                        console.log("Usuarios usuarioEncontrado", usuarioEncontrado)

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
        console.log("inicialNombre", inicialNombre)
        const inicialApellido = apellido[0].charAt(0).toUpperCase();
        console.log("inicialApellido", inicialApellido)

        return `${inicialNombre}${inicialApellido}`;
    };

    return (
        <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: '#F2994A' }}>{avatarTexto}</Avatar>
        </Stack>
    );
}
