import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import SchoolIcon from '@material-ui/icons/School';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { InputField } from '../../common/components/InputField';
import i18n from '../../../locales/i18n';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { PasswordInput } from '../components/PasswordInput';
import { authStyles } from '../../../styles/styles';
import { addUniversity } from './actions';

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

  render() {
    const { classes } = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SchoolIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            {i18n.t('add_university')}
          </Typography>
          <form className={classes.form} onSubmit={this.submit}>
            <InputField
              label={i18n.t('university_name')}
              autoFocus={true}
              onBlur={e => this.setState({ universityName: e.target.value })}
            />

            <InputField
              label={i18n.t('admin_username')}
              onBlur={e => this.setState({ username: e.target.value })}
            />

            <PasswordInput
              setPasswordMethod={e => this.setState({ password: e })}
              setConfirmPasswordMethod={e =>
                this.setState({ confirmPassword: e })
              }
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
  withStyles(authStyles),
  connect(mapStateToProps)
)(AddUniversity);
