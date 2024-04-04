import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ data, setData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = (term) => {
    return data.filter((option) => {
      const idIncludesTerm = option.id.toString().includes(term);
      return option.nombre.toLowerCase().includes(term.toLowerCase()) || idIncludesTerm;
    });
  };

  const handleSearchTermChange = (value) => {
    const newSearchTerm = value;
    setSearchTerm(newSearchTerm);
    setData(filterData(newSearchTerm));
  };

  const handleClearSearch = () => {
    setSearchTerm(""); // Borra el término de búsqueda
    setData(data); // Vuelve a establecer los datos originales
  };

  return (
    <div className="buscador">
      <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
      <input
        type="text"
        placeholder="Buscar por Nombre/ID"
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)}
        // Maneja el evento de borrar el contenido del campo de búsqueda
        onClear={handleClearSearch}
      />
    </div>
  );
};

export default SearchBar;
