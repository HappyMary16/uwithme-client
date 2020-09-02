import React from 'react';
import Grid from '@material-ui/core/Grid';
import { InputField } from '../../../common/components/InputField';
import i18n from '../../../locales/i18n';

export const PasswordInput = ({
                                setPasswordMethod,
                                setConfirmPasswordMethod
                              }) => {

  let [error, setError] = React.useState(false);
  let [password, setPassword] = React.useState('');
  let [confirmPassword, setConfirmPassword] = React.useState('');

  let setPasswordError = () => {
    if (confirmPassword !== '' && password !== ''
      && password !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <Grid>
      <InputField
        label={i18n.t('password')}
        type="password"
        error={error}
        helperText={error ? i18n.t('password_error') : ''}
        onChange={e => {
          setPassword(e.target.value);
          setPasswordMethod(e.target.value);
        }}
        onBlur={setPasswordError}
      />
      <InputField
        label={i18n.t('confirm_password')}
        type="password"
        error={error}
        helperText={error ? i18n.t('password_error') : ''}
        onChange={e => {
          setConfirmPassword(e.target.value);
          setConfirmPasswordMethod(e.target.value);
        }}
        onBlur={setPasswordError}
      />
    </Grid>);
};
