import React from 'react'

const SearchPet = () => {
  return (
    <div>
        <form className='fm-content-form-pet'>
            <div className='fm-form-title-pet'>
                <p>¿Dónde te gustaría trabajar?</p>
            </div>
            <div className='fm-form-select-pet'>
                <label htmlFor="oficinas"><input type="text" placeholder='Oficinas'/></label>
                <input type="submit" value="Buscar"/>
            </div>
        </form>
    </div>
  )
}

export default SearchPet