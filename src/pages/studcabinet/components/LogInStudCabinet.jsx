import React from 'react';
import i18n from '../../../locales/i18n';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { history } from '../../../store/Store';
import { USER_HOME } from '../../../constants/links';

export const LogInStudCabinet = ({ open, handleClose, handleCreate }) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  let onCreate = () => {
    handleCreate(email, password);
    handleClose();
  };

  let onHide = () => {
    history.push(USER_HOME);
  };

  return (
    <Modal show={open} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('lod-in')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <Form.Control
            placeholder={i18n.t('email')}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control
            placeholder={i18n.t('password')}
            onChange={e => setPassword(e.target.value)}
            type={'password'}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide} variant={'purple'}>
          {i18n.t('cancel')}
        </Button>
        <Button onClick={onCreate} variant={'purple'}>
          {i18n.t('log-in')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
