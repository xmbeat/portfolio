import React from 'react';

const CircularProgressBar = ({ progress}:{progress:number}) => {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference * (1- progress); // 0.25 representa el punto arriba en medio

  return (
    <svg width="100%" height="100%" viewBox='0 0 100 100' xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={dashoffset}
        transform='rotate(-90, 50, 50)'
      />
    </svg>
  );
};

export default CircularProgressBar;
