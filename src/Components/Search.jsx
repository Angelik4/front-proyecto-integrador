// Search.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = ({ handleSearch, handleCategories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({
    spaces: false,
    privates: false,
    vips: false,
    virtual: false,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleCategoryChange = (e) => {
    const { id, checked } = e.target;
    setSelectedCategories(prevState => ({ ...prevState, [id]: checked }));
    handleCategories({ ...selectedCategories, [id]: checked });
  };

  const handleClearFilters = () => {
    setSelectedCategories({
      spaces: false,
      privates: false,
      vips: false,
      virtual: false,
    });
    handleCategories({
      spaces: false,
      privates: false,
      vips: false,
      virtual: false,
    });
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
        <div className='fm-form-title'>
          <p>Filtrar por categorías:</p>
        </div>
        <div className='fm-form-checkbox'>
          <label htmlFor="spaces">
            <input
              type="checkbox"
              id="spaces"
              onChange={handleCategoryChange}
              checked={selectedCategories.spaces}
            />
            Espacios de coworking
          </label>
          <label htmlFor="private">
            <input
              type="checkbox"
              id="privates"
              onChange={handleCategoryChange}
              checked={selectedCategories.privates}
            />
            Oficinas privadas
          </label>
          <label htmlFor="vips">
            <input
              type="checkbox"
              id="vips"
              onChange={handleCategoryChange}
              checked={selectedCategories.vips}
            />
            Salas VIP
          </label>
          <label htmlFor="virtual">
            <input
              type="checkbox"
              id="virtual"
              onChange={handleCategoryChange}
              checked={selectedCategories.virtual}
            />
            Oficinas virtuales
          </label>
        </div>
          <button type="button" onClick={handleClearFilters}>Limpiar filtro</button>
        {/* <input type="submit" value="Buscar" /> */}
      </form>
    </div>
  );
};

export default Search;