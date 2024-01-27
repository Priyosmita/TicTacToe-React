import React from 'react';
import './ResetButton.css'

const ResetButton = ({ onClick }) => {
  return <button onClick={onClick} className='hand'>Reset Board</button>;
};

export default ResetButton;