import React from 'react';

export const CursorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))' }}
  >
    <path
      d="M5.5 3.5L19 16.5L11.5 18L9 22L5.5 3.5Z"
      fill="white"
      stroke="black"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);