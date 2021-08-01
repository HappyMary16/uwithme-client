import React from 'react';
import i18n from '../../../locales/i18n';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { history } from '../../../store/Store';
import { USER_HOME } from '../../../constants/links';
import { Message } from '../../common/components/Message';

export const LogInStudCabinet = ({ open, handleClose, handleCreate }) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [showMessage, setShowMessage] = React.useState(false);

  let submit = e => {
    e.preventDefault();
    handleCreate(email, password);
  };

  let onClose = () => {
    handleClose();
    setShowMessage(true);
  };

  return (
    <div>
      <Message
        open={showMessage}
        message={
          'Ми не можемо відобразити інформацію з кабінету студентів без вашого паролю :('
        }
        handleClose={() => history.push(USER_HOME)}
      />

      <Modal show={open} centered>
        <Modal.Header>
          <Modal.Title>{i18n.t('lod-in')}</Modal.Title>
        </Modal.Header>

        <Form onSubmit={submit}>
          <Modal.Body>
            <Form.Control
              placeholder={i18n.t('email')}
              onChange={e => setEmail(e.target.value)}
              type={'email'}
              required
            />
            <Form.Control
              placeholder={i18n.t('password')}
              onChange={e => setPassword(e.target.value)}
              type={'password'}
              required
            />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={onClose} variant={'purple'}>
              {i18n.t('cancel')}
            </Button>
            <Button type={'submit'} variant={'purple'}>
              {i18n.t('log-in')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
