import React, { useEffect, useState } from 'react';

const Favorites = () => {
    const [favOption, setFavOption] = useState([]);

    useEffect(() => {
        // Obtener los datos del localStorage al cargar la página
        const storedFavs = JSON.parse(localStorage.getItem("favOption")) || [];
        setFavOption(storedFavs);
    }, []);

    return(
        <div>FAVORITOS</div>
    );
}

export default Favorites