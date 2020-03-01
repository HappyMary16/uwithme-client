import React from 'react';

import { SIGN_UP } from '../../../common/constants/links';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { signInRequest } from '../actions';

import i18n from '../../../locales/i18n';
import { InputField } from '../../../common/components/InputField';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#483D8B'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#eeeeee'
  }
}));

let SignIn = ({ dispatch }) => {
  const classes = useStyles();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  let submit = e => {
    e.preventDefault();
    dispatch(signInRequest(username, password));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {i18n.t('sign_in')}
        </Typography>
        <form className={classes.form} onSubmit={e => submit(e)}>
          <InputField
            label={i18n.t('user_name')}
            autoFocus
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
          <InputField
            label={i18n.t('password')}
            type="password"
            autoComplete="current-password"
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
          {/*<FormControlLabel*/}
          {/*  control={<Checkbox value="remember" color="primary" />}*/}
          {/*  label="Remember me"*/}
          {/*/>*/}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.submit}
          >
            {i18n.t('sign_in')}
          </Button>
        </form>
        <Grid container>
          {/*<Grid item xs>*/}
          {/*  <Link href="#" variant="body2">*/}
          {/*    Forgot password?*/}
          {/*  </Link>*/}
          {/*</Grid>*/}
          <Grid item>
            <Link href={SIGN_UP} variant="body2">
              {i18n.t('sign_up_button')}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export const SingIn = connect()(SignIn);
