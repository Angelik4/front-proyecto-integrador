import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { setHours, setMinutes, isSameDay } from 'date-fns'; // Agregar isSameDay
import sendRequest from "../Components/utils/SendRequest"
registerLocale('es', es);

const Calendar = () => {
  const [startDate, setStartDate] = useState(setMinutes(setHours(new Date(), 0), 0));
  const [endDate, setEndDate] = useState(setMinutes(setHours(new Date(), 0), 0));
  const [reservedTimes, setReservedTimes] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  
  useEffect(() => {
    const fetchReservedTimes = async () => {
      try {
        const endpoint = "http://localhost:8081/reservaciones"; // Endpoint para obtener las reservaciones
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Error al obtener las reservaciones");
        }
        const reservaciones = [
          { salaId: 1, inicio: new Date("2024-04-04T08:00:00"), fin: new Date("2024-04-04T10:00:00") },
          { salaId: 2, inicio: new Date("2024-04-04T09:00:00"), fin: new Date("2024-04-04T11:00:00") },
          { salaId: 1, inicio: new Date("2024-04-04T14:00:00"), fin: new Date("2024-04-04T16:00:00") }
          // Supongamos que estas son las reservaciones obtenidas del servidor
        ];
        setReservedTimes(reservaciones);
      } catch (error) {
        console.error("Error fetching reserved times:", error);
      }
    };
    fetchReservedTimes();
  }, []);

  useEffect(() => {
    const calculateAvailableRooms = () => {
      // Filtrar las reservaciones que caen dentro del rango de fechas seleccionado
      const reservacionesFiltradas = reservedTimes.filter(reservacion => {
        return isSameDay(reservacion.inicio, startDate) || isSameDay(reservacion.inicio, endDate);
      });

      // Obtener una lista de todas las salas disponibles
      const todasLasSalas = Array.from(new Set(reservacionesFiltradas.map(reservacion => reservacion.salaId)));

      // Filtrar las salas que tienen disponibilidad en el rango de fechas seleccionado
      const salasDisponibles = todasLasSalas.filter(salaId => {
        // Verificar si la sala tiene al menos una hora disponible en el rango de fechas seleccionado
        return reservedTimes.some(reservacion => reservacion.salaId === salaId && (
          (reservacion.inicio >= startDate && reservacion.inicio < endDate) ||
          (reservacion.fin > startDate && reservacion.fin <= endDate) ||
          (reservacion.inicio <= startDate && reservacion.fin >= endDate)
        ));
      });

      // Establecer las salas disponibles en el estado
      setAvailableTimes(salasDisponibles);
    };

    calculateAvailableRooms();
  }, [startDate, endDate, reservedTimes]);

  const handleSearch = async () => {
    try {
      const endpoint = "http://localhost:8081/buscar-salas-disponibles"; // Endpoint para buscar salas disponibles
      const response = await sendRequest(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        })
      });
      if (!response.ok) {
        throw new Error("Error al buscar salas disponibles");
      }
      const data = await response.json();
      // Actualizar el estado con las salas disponibles obtenidas de la respuesta
      setAvailableTimes(data.salasDisponibles);
    } catch (error) {
      console.error("Error al buscar salas disponibles:", error);
    }
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
      <button onClick={handleSearch}>Buscar</button>
      <ul>
        {availableTimes.map((salaId, index) => (
          <li key={index}>Sala {salaId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
