import React from 'react';
import Form from 'react-bootstrap/Form';
import i18n from '../../../locales/i18n';

export const PasswordInput = ({
  setPasswordMethod,
  setConfirmPasswordMethod
}) => {
  let [error, setError] = React.useState(false);
  let [password, setPassword] = React.useState('');
  let [confirmPassword, setConfirmPassword] = React.useState('');

  let setPasswordError = () => {
    if (
      confirmPassword !== '' &&
      password !== '' &&
      password !== confirmPassword
    ) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Form.Group>
      <Form.Control
        className={error ? 'form-control-error' : ''}
        placeholder={i18n.t('password') + ' *'}
        type={'password'}
        onChange={e => {
          setPassword(e.target.value);
          setPasswordMethod(e.target.value);
        }}
        onBlur={setPasswordError}
        required
      />
      {error && (
        <Form.Text id={'passwordHelpBlock'} muted>
          {i18n.t('password_error')}
        </Form.Text>
      )}
      <Form.Control
        className={error ? 'form-control-error' : ''}
        placeholder={i18n.t('confirm_password') + ' *'}
        type={'password'}
        onChange={e => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordMethod(e.target.value);
        }}
        onBlur={setPasswordError}
        required
      />
      {error && (
        <Form.Text id={'passwordHelpBlock'} muted>
          {i18n.t('password_error')}
        </Form.Text>
      )}
    </Form.Group>
  );
};
