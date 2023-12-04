import { useState, useEffect } from 'react';
import './NavBar.css'; // Import your custom CSS file

const App = () => {
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
      setCurrentDate(formattedDate);
    };

    getCurrentDate();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card p-4" style={{ backgroundColor: '#421c5f' }}>
        <h1 className="text-white">Current Date: {currentDate}</h1>
      </div>
    </div>
  );
};

export default App;
