import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { InputField } from '../../../../common/components/InputField';
import i18n from '../../../../locales/i18n';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { addUniversity } from '../actions';

const useStyles = theme => ({
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
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  menu: {
    width: 200
  }
});

class AddUniversity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      universityName: '',
      username: '',
      password: '',
      confirmPassword: '',
      passwordError: false
    };

    this.submit = this.submit.bind(this);
    this.setPasswordError = this.setPasswordError.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    dispatch(
      addUniversity(
        this.state.universityName,
        this.state.username,
        this.state.password,
        this.state.confirmPassword
      )
    );
  }

  setPasswordError() {
    if (this.state.password !== this.state.confirmPassword) {
      this.setState({ passwordError: true });
    } else {
      this.setState({ passwordError: false });
    }
  }

  render() {
    const { classes } = this.props;
    const { passwordError } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SchoolIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i18n.t('add_university')}
          </Typography>
          <form className={classes.form} onSubmit={this.submit}>
            <InputField
              label={i18n.t('university')}
              autoFocus={true}
              onBlur={e => this.setState({ universityName: e.target.value })}
            />

            <InputField
              label={i18n.t('admin_username')}
              onBlur={e => this.setState({ username: e.target.value })}
            />
            <InputField
              label={i18n.t('admin_password')}
              type="password"
              error={passwordError}
              helperText={passwordError ? i18n.t('password_error') : ''}
              onBlur={e => this.setState({ password: e.target.value })}
            />
            <InputField
              label={i18n.t('confirm_password')}
              type="password"
              error={passwordError}
              helperText={passwordError ? i18n.t('password_error') : ''}
              onBlur={e => {
                this.setState({ confirmPassword: e.target.value });
                this.setPasswordError();
              }}
            />
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              {i18n.t('add')}
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(AddUniversity);
