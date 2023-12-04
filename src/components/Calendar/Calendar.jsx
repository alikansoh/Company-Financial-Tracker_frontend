// MyCalendar.jsx
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styles
import './Calendar.css'; // Import your custom styles

const MyCalendar = () => {
 const [selectedDate, setSelectedDate] = useState(new Date());
 const [showCalendar, setShowCalendar] = useState(false);

 const handleDateChange = (date) => {
 setSelectedDate(date);
 };

 const handleButtonClick = () => {
 setShowCalendar((prevShowCalendar) => !prevShowCalendar);
 };

 return (
 <div className="calendar-container">
  <button
    className={`custom-button ${showCalendar ? 'active' : ''}`}
    onClick={handleButtonClick}
  >
    {selectedDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}
  </button>
  {showCalendar && (
    <div className="calendar-wrapper">
      <div className="calendar-top-bar" style={{ backgroundColor: '#421c5f' }} />
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        style={{ backgroundColor: '#f4f4f4' }}
      />
    </div>
  )}
 </div>
 );
};

export default MyCalendar;
