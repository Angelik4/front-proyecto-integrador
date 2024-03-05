import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { StateContext } from './utils/StateProvider';

const Search = ({ handleSearch }) => {
  const [state] = useContext(StateContext);
  const { products } = state;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState({
    spaces: false,
    privates: false,
    vips: false,
    virtual: false,
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(product => {
      if (selectedCategories.spaces && product.categoria === 'spaces') {
        return true;
      }
      if (selectedCategories.privates && product.categoria === 'privates') {
        return true;
      }
      if (selectedCategories.vips && product.categoria === 'vips') {
        return true;
      }
      if (selectedCategories.virtual && product.categoria === 'virtual') {
        return true;
      }
      return false;
    });
    setFilteredProducts(filtered);
  }, [selectedCategories, products]);

  const handleOnCheckbox = event => {
    const { name, checked } = event.target;
    setSelectedCategories(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleChange = e => {
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
        <div className='fm-form-Filter'>
          <p>Filtrar por Categoría:</p>
        </div>
        <div className='fm-form-checkbox'>
          <label htmlFor="spaces">
            <input
              type="checkbox"
              id="spaces"
              name="spaces"
              value="spaces"
              onChange={handleOnCheckbox}
              checked={selectedCategories.spaces}
            />
            Espacios Pet Friendly
          </label>
          <label htmlFor="private">
            <input
              type="checkbox"
              id="privates"
              name='privates'
              value="privates"
              onChange={handleOnCheckbox}
              checked={selectedCategories.privates}
            />
            Oficinas privadas
          </label>
          <label htmlFor="vips">
            <input
              type="checkbox"
              id="vips"
              name='vips'
              value="vips"
              onChange={handleOnCheckbox}
              checked={selectedCategories.vips}
            />
            Salas VIP
          </label>
          <label htmlFor="virtual">
            <input
              type="checkbox"
              id="virtual"
              name='virtual'
              value="virtual"
              onChange={handleOnCheckbox}
              checked={selectedCategories.virtual}
            />
            Oficinas virtuales
          </label>
        </div>
        <div className='fm-content-info-selected'>
          {filteredProducts.map(product => (
            <div key={product.id}>
              <h3>{product.nombre}</h3>
              <p>{product.descripcion}</p>
              {/* Agrega aquí cualquier otra información que desees mostrar */}
            </div>
          ))}
        </div>
        <input type="submit" value="Buscar" />
      </form>
    </div>
  );
};

export default Search;