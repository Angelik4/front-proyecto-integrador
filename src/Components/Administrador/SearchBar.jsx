import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTermChange = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="buscador">
      <FontAwesomeIcon icon={faSearch} style={{ color: '#333', marginRight: '5px' }} />
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
