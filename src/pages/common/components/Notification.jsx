import React from 'react';
import Toast from 'react-bootstrap/Toast';

export const Notification = ({ header, text, show, onClose }) => {

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
    >
      <div className={"notification-container"}>
        <Toast show={show} onClose={onClose} delay={0} animation={false}>
          <Toast.Header>
            <strong className="mr-auto">{header}</strong>
          </Toast.Header>
          <Toast.Body>{text}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};
