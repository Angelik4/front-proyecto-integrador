// En Search.jsx
import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div>
      <form className='fm-content-form'>
        <div className='fm-form-title'>
          <p>¿Dónde te gustaría trabajar?</p>
        </div>
        <div className='fm-form-select'>
          <input
            type="text"
            placeholder='Oficinas'
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
