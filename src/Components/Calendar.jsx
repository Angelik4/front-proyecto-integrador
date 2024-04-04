import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { setHours, setMinutes } from 'date-fns';
import sendRequest from "../Components/utils/SendRequest"
registerLocale('es', es);

const Calendar = () => {
  const [startDate, setStartDate] = useState(setMinutes(setHours(new Date(), 0), 0));
  const [endDate, setEndDate] = useState(setMinutes(setHours(new Date(), 0), 0));
  const [availableTimes, setAvailableTimes] = useState([]);
  
  const fetchAvailableRooms = async () => {
    try {
      // Convertir fecha y hora de inicio al huso horario local
      const startDateTime = new Date(startDate.getTime() - (startDate.getTimezoneOffset() * 60000));
      const formattedStartDate = startDateTime.toISOString();

      // Convertir fecha y hora de finalización al huso horario local
      const endDateTime = new Date(endDate.getTime() - (endDate.getTimezoneOffset() * 60000));
      const formattedEndDate = endDateTime.toISOString();

      const endpoint = `http://localhost:8081/reservaespacio/salasDisponibles/${formattedStartDate}/${formattedEndDate}`;
      const response = await fetch(endpoint, {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error("Error al obtener las salas disponibles");
      }
      const data = await response.json();
      setAvailableTimes(data.salasDisponibles);
    } catch (error) {
      console.error("Error al buscar salas disponibles:", error);
    }
  };

  const handleSearch = () => {
    fetchAvailableRooms();
  };

  return (
    <div className="date-picker-container">
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
        selectsStart
        timeIntervals={60}
        dateFormat="yyyy/MM/dd h aa"
        showTimeSelect
        withPortal
        className="auto-width"
        locale={es}
        timeCaption="Hora"
        showIcon
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        endDate={endDate}
        selectsEnd
        timeIntervals={60}
        dateFormat="yyyy/MM/dd h aa"
        showTimeSelect
        withPortal
        className="auto-width"
        locale={es}
        timeCaption="Hora"
        showIcon
      />
      <button type="button" onClick={handleSearch}>Buscar</button>
      <ul>
        {availableTimes.map((salaId, index) => (
          <li key={index}>Sala {salaId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
