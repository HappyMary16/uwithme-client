import React from 'react';
import './Progress.css';

export const Progress = ({ progress }) => {
  return (
    <div className="ProgressBar">
      <div className="Progress" style={{ width: progress + '%' }} />
    </div>
  );
};
