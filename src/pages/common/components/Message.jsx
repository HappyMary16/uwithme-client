import React from 'react';
import i18n from '../../../locales/i18n';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const Message = ({ open = false, message, handleClose }) => {
  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button onClick={handleClose} variant={'purple'}>
          {i18n.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
