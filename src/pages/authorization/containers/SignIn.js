import React from 'react';

import { SIGN_UP } from '../../../common/constants/links';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { signInRequest } from '../actions/authActions';

import i18n from '../../../locales/i18n';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

let SignIn = ({ dispatch }) => {
  const classes = useStyles();

  let username = '';
  let password = '';

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
        <form className={classes.form} noValidate onSubmit={e => submit(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label={i18n.t('user_name')}
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => {
              username = e.target.value;
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={i18n.t('password')}
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => {
              password = e.target.value;
            }}
          />
          {/*<FormControlLabel*/}
          {/*  control={<Checkbox value="remember" color="primary" />}*/}
          {/*  label="Remember me"*/}
          {/*/>*/}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {i18n.t('sign_in')}
          </Button>
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
        </form>
      </div>
    </Container>
  );
};

export const SingIn = connect()(SignIn);
