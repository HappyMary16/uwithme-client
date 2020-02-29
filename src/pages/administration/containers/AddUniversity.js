import React, { Component } from 'react';
import {
  loadDepartments,
  loadGroups,
  loadInstitutes
} from '../../../common/actions';
import { signUpRequest } from '../../authorization/actions';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Typography from '@material-ui/core/Typography';
import i18n from '../../../locales/i18n';
import Grid from '@material-ui/core/Grid';
import { InputField } from '../../../common/components/InputField';
import Button from '@material-ui/core/Button';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

const useStyles = theme => ({
  paper: {
    margin: theme.spacing(1),
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
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
      adminUsername: '',
      password: '',
      confirmPassword: '',
      passwordError: false
    };

    this.submit = this.submit.bind(this);
    this.setPasswordError = this.setPasswordError.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadInstitutes());
    dispatch(loadDepartments());
    dispatch(loadGroups());
  }

  submit() {
    const { dispatch } = this.props;

    dispatch(
      signUpRequest(
        this.state.firstName,
        this.state.lastName,
        this.state.surname
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i18n.t('add_university')}
          </Typography>
          <Grid container spacing={2}>
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
              onChange={e => this.setState({ confirmPassword: e.target.value })}
              onBlur={() => this.setPasswordError}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.submit}
            >
              {i18n.t('add')}
            </Button>
          </Grid>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    institutes: state.infoReducers.institutes,
    departments: state.infoReducers.departments,
    groups: state.infoReducers.groups,
    scienceDegrees: state.infoReducers.scienceDegrees
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(AddUniversity);
