import React from 'react';

const NotificationIcon = ({ width = 24, height = 24, color = '#7A7A7A' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.5 26.25H17.5C17.5 27.625 16.375 28.75 15 28.75C13.625 28.75 12.5 27.625 12.5 26.25ZM26.25 23.75V25H3.75V23.75L6.25 21.25V13.75C6.25 9.875 8.75 6.5 12.5 5.375V5C12.5 3.625 13.625 2.5 15 2.5C16.375 2.5 17.5 3.625 17.5 5V5.375C21.25 6.5 23.75 9.875 23.75 13.75V21.25L26.25 23.75ZM21.25 13.75C21.25 10.25 18.5 7.5 15 7.5C11.5 7.5 8.75 10.25 8.75 13.75V22.5H21.25V13.75Z"
      fill={color}
    />
  </svg>
);

export default NotificationIcon;
