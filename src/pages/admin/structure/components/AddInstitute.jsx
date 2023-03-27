import React from 'react';

import i18n from '../../../../locales/i18n';
import { Button, Form, Modal } from 'react-bootstrap';
import {useDispatch} from "react-redux";
import {createInstitute} from "../../../../actions/instituteActions";

export function AddInstitute({ handleClose }) {

  const dispatch = useDispatch();
  const [instituteName, setInstituteName] = React.useState('');

  let onCreate = () => {
    dispatch(createInstitute(instituteName));
    handleClose();
  };

  return (
    <Modal show={true} centered>
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
}
