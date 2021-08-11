import React from 'react';
import i18n from '../../../locales/i18n';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export const ErrorMessage = ({ error, handleClose }) => {
  return (
    <Modal show={true} onHide={() => handleClose(error.id)} centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>{!!error && error.message}</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button onClick={() => handleClose(error.id)} variant={'purple'}>
          {i18n.t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
