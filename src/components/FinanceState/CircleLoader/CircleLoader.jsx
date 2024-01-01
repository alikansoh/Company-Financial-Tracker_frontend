// LoadingRing.js

import React, { useState, useEffect } from 'react';
import './CircleLoader.css'; // Ensure you have a CSS file named CircleLoader.css with the provided styles

const LoadingRing = ({ percentage }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 1;
        return newProgress > percentage ? percentage : newProgress;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div className="loading-ring-container">
      <div className="loading-ring" style={{ '--percentage': `${progress}%` }}>
        <div className="progress-text">{`${Math.round(progress)}%`}</div>
      </div>
    </div>
  );
};

export default LoadingRing;
