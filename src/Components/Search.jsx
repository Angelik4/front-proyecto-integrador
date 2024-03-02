// En Search.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

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
          <FontAwesomeIcon className='iconLupa' icon={faMagnifyingGlass} />
        </div>
        <div className='fm-form-checkbox'>
              <label htmlFor="spaces"><input type="checkbox" id='spaces' />Espacios de coworking</label>
              <label htmlFor="private"><input type="checkbox" id='private' />Oficinas privadas</label> 
              <label htmlFor="vips"><input type="checkbox" id='vips' />Salas VIP</label>
              <label htmlFor="virtual"><input type="checkbox" id='virtual' />Oficinas virtuales</label>
            </div>
            <input type="submit" value="Buscar"/>
      </form>
    </div>
  );
};

export default Search;
