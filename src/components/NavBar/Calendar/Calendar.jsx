import React , { useState, useEffect } from 'react';
import "./Calendar.css"

const Calendar = () => {

    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        const getCurrentDate = () => {
          const date = new Date();
          const monthNames = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
          ];
    
          const month = monthNames[date.getMonth()];
          const day = date.getDate();
          const year = date.getFullYear();
          const formattedDate = `${month} ${day}, ${year}`;
          setCurrentDate(formattedDate)
        };
    
        getCurrentDate();
      }, []);
  return (
        <div className="calendar">
            <div className="bi bi-calendar2-event"></div>
            <div className="timeAndDate"><p> {currentDate} </p></div>
        </div>
    
        )
}

export default Calendar;