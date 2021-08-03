import React from 'react';
import i18n from '../../../locales/i18n';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const Message = ({
  open = false,
  message,
  handleClose,
  description
}) => {
  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      {!!description && <Modal.Body>{description}</Modal.Body>}
      <Modal.Footer>
        <Button onClick={handleClose} variant={'purple'}>
          {i18n.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
