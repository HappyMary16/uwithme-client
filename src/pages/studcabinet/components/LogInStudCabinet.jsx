import React from 'react';
import i18n from '../../../locales/i18n';
import { Button, Form, Modal } from 'react-bootstrap';
import { USER_HOME } from '../../../constants/links';
import { Message } from '../../common/components/Message';
import {useNavigate} from "react-router-dom";

export const LogInStudCabinet = ({ open, handleCreate }) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [showMessage, setShowMessage] = React.useState(false);
  const navigate = useNavigate();

  let submit = e => {
    e.preventDefault();
    handleCreate(email, password);
  };

  let onClose = () => {
    setShowMessage(true);
  };

  return (
    <div>
      <Message
        open={showMessage}
        message={i18n.t('can-not-show-stud-cab-info')}
        description={i18n.t('can-not-show-stud-cab-info-description')}
        handleClose={() => navigate(USER_HOME)}
      />

      <Modal show={open} centered>
        <Modal.Header>
          <Modal.Title>{i18n.t('log-in-stud-cab')}</Modal.Title>
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
            <p>
              Якщо ви не хочете вводити свої дані, ви можете переглянути
              інформацію з кабінету студента в ньому ж.
              <br />
              <a href={'https://studcabinet.kpi.kharkov.ua/'}>
                studcabinet.kpi.kharkov.ua
              </a>
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={onClose} variant={'purple'}>
              {i18n.t('cancel')}
            </Button>
            <Button type={'submit'} variant={'purple'}>
              {i18n.t('sign_in')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
