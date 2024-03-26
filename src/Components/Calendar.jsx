import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Estilos base
import "react-date-range/dist/theme/default.css"; // Tema predeterminado
import { addDays, isWithinInterval } from "date-fns"; // Importación de date-fns
import es from "date-fns/locale/es"; // Importación del idioma español

const Calendar = () => {
  const [fechasOcupadas, setFechasOcupadas] = useState([]);

  const [monthsToShow, setMonthsToShow] = useState(2);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection"
  });

 /*  console.log(selectionRange.startDate?.toISOString().split("T").shift());
  console.log(selectionRange.endDate?.toISOString().split("T").shift()); */

  useEffect(() => {
    const reservationsFromServer = [
      { start: "2024-03-22", end: "2024-03-25" },
      { start: "2024-04-12", end: "2024-04-18" },
      { start: "2024-04-27", end: "2024-04-30" }
    ];

    const disabledDates = [];

    reservationsFromServer.forEach((reservation) => {
      const { start, end } = reservation;
      const startDate = new Date(start);
      startDate.setDate(startDate.getDate() + 1);
      const endDate = new Date(end);
      endDate.setDate(endDate.getDate() + 1);
      const interval = { start: startDate, end: endDate };
      disabledDates.push(interval);
    });

    setFechasOcupadas(disabledDates);
  }, []);

  return (
    <div className="calendar-container">
      <DateRange
        className="calendar"
        ranges={[selectionRange]}
        onChange={(range) => setSelectionRange(range.selection)}
        months={monthsToShow}
        locale={es}
      />
    </div>
  );
};

export default Calendar;