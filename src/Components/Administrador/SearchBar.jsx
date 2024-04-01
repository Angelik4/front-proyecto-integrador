import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ data, setFilteredData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = (term) => {
    return data.filter((option) => {
      // Convertir el ID a cadena y verificar si incluye el término de búsqueda
      const idIncludesTerm = String(option.id).includes(term);
  
      // Verificar si el nombre incluye el término o si el ID incluye el término
      return option.nombre.toLowerCase().includes(term.toLowerCase()) || idIncludesTerm;
    });
  };

  const handleSearchTermChange = (value) => {
    const newSearchTerm = value;
    setSearchTerm(newSearchTerm);
    setFilteredData(filterData(newSearchTerm));
  };

  return (
    <div className="buscador">
      <FontAwesomeIcon
        icon={faSearch}
        style={{ color: "#333", marginRight: "5px" }}
      />
      <input 
        type="text" 
        placeholder="Buscar por Nombre/ID" 
        value={searchTerm} 
        onChange={(e) => handleSearchTermChange(e.target.value)} 
      />
    </div>
  );
};

export default SearchBar;
