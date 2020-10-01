import React from 'react';

import { SIGN_UP } from '../../../constants/links';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { signInRequest, signOut } from '../actions';

import i18n from '../../../locales/i18n';
import { InputField } from '../../../common/components/InputField';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { authStyles } from '../../../common/styles/styles';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(signOut());
  }

  submit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { username, password } = this.state;

    dispatch(signInRequest(username, password));
  }

  render() {
    const { classes } = this.props;

    return (
      <Container component='main' maxWidth='xs'>
        <CssBaseline/>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component='h1' variant='h5'>
            {i18n.t('sign_in')}
          </Typography>
          <form className={classes.form} onSubmit={e => this.submit(e)}>
            <InputField
              label={i18n.t('user_name')}
              autoFocus
              onChange={e => this.setState({ username: e.target.value })}
            />
            <InputField
              label={i18n.t('password')}
              type='password'
              autoComplete='current-password'
              onChange={e => this.setState({ password: e.target.value })}
            />
            {/*<FormControlLabel*/}
            {/*  control={<Checkbox value='remember' color='primary' />}*/}
            {/*  label='Remember me'*/}
            {/*/>*/}
            <Button
              type='submit'
              fullWidth
              variant='outlined'
              color='primary'
              className={classes.submit}
            >
              {i18n.t('sign_in')}
            </Button>
          </form>
          <Grid container>
            {/*<Grid item xs>*/}
            {/*  <Link href='#' variant='body2'>*/}
            {/*    Forgot password?*/}
            {/*  </Link>*/}
            {/*</Grid>*/}
            <Grid item>
              <Link href={SIGN_UP} variant='body2'>
                {i18n.t('sign_up_button')}
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }
}

export default compose(withStyles(authStyles), connect())(SignIn);
