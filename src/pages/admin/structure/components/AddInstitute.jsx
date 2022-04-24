import React from 'react';

import i18n from '../../../../locales/i18n';
import { Button, Form, Modal } from 'react-bootstrap';

export const AddInstitute = ({ open, handleClose, handleCreate }) => {
  const [instituteName, setInstituteName] = React.useState('');

  let onCreate = () => {
    handleCreate(instituteName);
    handleClose();
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('create_institute')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Control
            placeholder={i18n.t('institute_name')}
            onChange={e => setInstituteName(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant={'purple'}>
          {i18n.t('cancel')}
        </Button>
        <Button onClick={onCreate} variant={'purple'}>
          {i18n.t('create')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
