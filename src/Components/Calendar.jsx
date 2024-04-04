import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { setHours, setMinutes } from 'date-fns';

registerLocale('es', es);

const Calendar = () => {
  const [startDate, setStartDate] = useState(setMinutes(setHours(new Date(), 0), 0));
  const [endDate, setEndDate] = useState(setMinutes(setHours(new Date(), 0), 0)); 

  // Lista de horas ocupadas
  const horasOcupadas = [17, 18, 19, 20];

  // Función para deshabilitar horas ocupadas
  const esHoraOcupada = date => {
    const hour = date.getHours();
    return !horasOcupadas.includes(hour);
  };

  return (
    <div className="date-picker-container">
      <DatePicker
  selected={startDate}
  onChange={(date) => setStartDate(date)}
  startDate={startDate}
  selectsStart
  timeIntervals={60}
  dateFormat="yyyy/MM/dd h aa" // Cambia el formato de fecha aquí
  showTimeSelect
  withPortal
  className="auto-width"
  locale={es}
  timeCaption="Hora"
  showIcon
  excludeTimes={[
    setHours(new Date(), 17),
    setHours(new Date(), 18),
    setHours(new Date(), 19),
    setHours(new Date(), 20)
  ]}
  filterTime={esHoraOcupada}
/> 
<DatePicker
  selected={endDate}
  onChange={(date) => setEndDate(date)}
  endDate={endDate}
  selectsEnd
  timeIntervals={60}
  dateFormat="yyyy/MM/dd h aa" // Cambia el formato de fecha aquí
  showTimeSelect
  withPortal
  className="auto-width"
  locale={es}
  timeCaption="Hora"
  showIcon
  excludeTimes={[
    setHours(new Date(), 17),
    setHours(new Date(), 18),
    setHours(new Date(), 19),
    setHours(new Date(), 20)
  ]}
  filterTime={esHoraOcupada}
/> 

    </div>
  );
};

export default Calendar;