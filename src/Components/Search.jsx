import React from 'react'

const Search = () => {
  return (
    <div>
        <form className='fm-content-form'>
            <div className='fm-form-title'>
              <p>¿Dónde te gustaría trabajar?</p>
            </div>
            <div className='fm-form-checkbox'>
              <label htmlFor="spaces"><input type="checkbox" id='spaces' />Espacios de coworking</label>
              <label htmlFor="private"><input type="checkbox" id='private' />Oficinas privadas</label> 
              <label htmlFor="vips"><input type="checkbox" id='vips' />Salas VIP</label>
              <label htmlFor="virtual"><input type="checkbox" id='virtual' />Oficinas virtuales</label>
            </div>
            <div className='fm-form-select'>
              <select name="" id="">
                <option value="">Medellín, colombia</option>
              </select>
              <input type="date" />
              <select name="" id="">
                <option value="">Pets</option>
              </select>
              <input type="submit" value="Buscar"/>
            </div>
        </form>
    </div>
  )
}

export default Search