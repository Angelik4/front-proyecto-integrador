import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { setHours, setMinutes, getHours, isSameDay } from 'date-fns';
import sendRequest from "./utils/SendRequest";
import '../css/Detalle.css';

registerLocale('es', es);

const CalendarDetails = ({ salaId, setSelectedDates }) => {
  const [startDate, setStartDate] = useState(setMinutes(setHours(new Date(), 0), 0));
  const [endDate, setEndDate] = useState(setMinutes(setHours(new Date(), 0), 0));
  const [occupiedTimes, setOccupiedTimes] = useState([]);

  useEffect(() => {
    const fetchOccupiedDates = async () => {
      try {
        const endpoint = `http://localhost:8081/reservaespacio/fechasOcupadas/${salaId}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Error al obtener las fechas ocupadas");
        }
        const data = await response.json();
        console.log("Fechas ocupadas:", data);

        // Almacenar las horas ocupadas
        setOccupiedTimes(data || []);
      } catch (error) {
        console.error("Error fetching occupied dates:", error);
      }
    };

    fetchOccupiedDates();
  }, [salaId]);

  // Función para incluir las horas disponibles en los DatePickers
  const includeAvailableTimes = (date) => {
    const hour = getHours(date);
    const day = date.getDate();
    return !occupiedTimes.some(time => {
      const occupiedTime = new Date(time);
      return isSameDay(date, occupiedTime) && getHours(occupiedTime) === hour;
    });
  };

  // Función para manejar el cambio de fecha de inicio
  const handleStartDateChange = (date) => {
    setStartDate(date);
    setSelectedDates([date, endDate]);
  };

  // Función para manejar el cambio de fecha de fin
  const handleEndDateChange = (date) => {
    setEndDate(date);
    setSelectedDates([startDate, date]);
  };

  return (
    <div className="date-picker-container">
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="start-date">Fecha de Inicio:</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={handleStartDateChange}
          startDate={startDate}
          selectsStart
          timeIntervals={60}
          dateFormat="yyyy/MM/dd HH:mm"
          showTimeSelect
          className="auto-width"
          locale={es}
          timeCaption="Hora"
          showIcon
          filterTime={includeAvailableTimes}
        />
      </div>
      <div>
        <label htmlFor="end-date">Fecha de Fin:</label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={handleEndDateChange}
          endDate={endDate}
          selectsEnd
          timeIntervals={60}
          dateFormat="yyyy/MM/dd HH:mm"
          showTimeSelect
          className="auto-width"
          locale={es}
          timeCaption="Hora"
          showIcon
          filterTime={includeAvailableTimes}
        />
      </div>
    </div>
  );
};

export default CalendarDetails;