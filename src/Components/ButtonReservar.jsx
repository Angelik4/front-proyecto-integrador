import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight} from '@fortawesome/free-solid-svg-icons';

const ButtonReservar = () => {
  return (
    <>
    <Link className='cards_btnReservar' to="">Reservar<FontAwesomeIcon icon={faArrowRight} /></Link>
    </>
  )
}

export default ButtonReservar