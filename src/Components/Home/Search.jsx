import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Calendar from '../Calendar';

const Search = ({ handleSearch, handleCategories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({
    multiple: false,
    personal: false,
    vip: false,
    pet: false,
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
      multiple: false,
      personal: false,
      vip: false,
      pet: false,
    });
    handleCategories({
      multiple: false,
      personal: false,
      vip: false,
      pet: false,
    });
  };

  return (
    <div>
      <form className='fm-content-form'>
        <div className='fm-form-title'>
          <p>¿Dónde te gustaría trabajar?</p>
        </div>
        <div className='fm-form-checkbox'>
          <label htmlFor="multiple">
            <input
              type="checkbox"
              id="multiple"
              onChange={handleCategoryChange}
              checked={selectedCategories.multiple}
            />
            Múltiple
          </label>
          <label htmlFor="private">
            <input
              type="checkbox"
              id="personal"
              onChange={handleCategoryChange}
              checked={selectedCategories.personal}
            />
            Sala Personal
          </label>
          <label htmlFor="vip">
            <input
              type="checkbox"
              id="vip"
              onChange={handleCategoryChange}
              checked={selectedCategories.vip}
            />
            Vip
          </label>
          <label htmlFor="pet">
            <input
              type="checkbox"
              id="pet"
              onChange={handleCategoryChange}
              checked={selectedCategories.pet}
            />
            Pet Friendly
          </label>
          <div className='fm-form-clear-categories'>
          <button type="button" onClick={handleClearFilters}>Limpiar filtros</button>
        </div>
        </div>
        <div className='fm-form-select'>
          <div className='fm-form-search'>
            <input
              type="text"
              placeholder='Oficinas'
              value={searchTerm}
              onChange={handleChange}
            />
            <FontAwesomeIcon className='iconLupa' icon={faMagnifyingGlass} />
          </div>
          <Calendar/>
          {/* <button type="button" onClick={handleClearFilters}>Buscar</button> */}
        </div>
      </form>
    </div>
  );
};

export default Search;