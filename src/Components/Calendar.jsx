import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { setHours, setMinutes, format } from 'date-fns';
import sendRequest from "../Components/utils/SendRequest"
registerLocale('es', es);

const Calendar = () => {
  const [startDate, setStartDate] = useState(setMinutes(setHours(new Date(), 0), 0));
  const [endDate, setEndDate] = useState(setMinutes(setHours(new Date(), 0), 0));
  const [availableTimes, setAvailableTimes] = useState([]);
  
  const fetchAvailableRooms = async () => {
    try {
      // Formatear fecha y hora de inicio
      const formattedStartDate = format(startDate, "yyyy-MM-dd'T'HH:mm");

      // Formatear fecha y hora de finalización
      const formattedEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm");

      console.log("Fecha de inicio:", formattedStartDate);
      console.log("Fecha de finalización:", formattedEndDate);

      const endpoint = `http://localhost:8081/reservaespacio/salasDisponibles/${formattedStartDate}/${formattedEndDate}`;
      const response = await fetch(endpoint, {
        method: 'GET'
      });

      if (!response.ok) {
        throw new Error("Error al obtener las salas disponibles: " + response.statusText);
      }

      const data = await response.json();

      console.log("Data:", data); // Agregar impresión de data para depurar

      if (!data || !data.salasDisponibles) {
        throw new Error("No se recibieron datos de las salas disponibles");
      }

      console.log("Salas disponibles:", data.salasDisponibles);
      setAvailableTimes(data || []);
    } catch (error) {
      console.error("Error al buscar salas disponibles:", error);
      setAvailableTimes([]); // Establecer availableTimes como un arreglo vacío en caso de error
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
        dateFormat="yyyy/MM/dd HH:mm"
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
        dateFormat="yyyy/MM/dd HH:mm"
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
