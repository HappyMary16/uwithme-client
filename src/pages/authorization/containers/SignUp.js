import React from 'react';

import { UserRoles } from '../../../common/constants/userRoles';
import { SIGN_IN } from '../../../common/constants/links';
import { SelectField } from '../../../common/components/SelectField';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { signUpRequest } from '../actions';
import { connect } from 'react-redux';
import { InputField } from '../../../common/components/InputField';
import i18n from '../../../locales/i18n';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import {
  loadDepartments,
  loadGroups,
  loadInstitutes
} from '../../../common/actions';

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

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      institute: '1',
      department: '1',
      group: '1',
      userRole: '1',
      scienceDegree: '1',
      firstName: '',
      lastName: '',
      surname: '',
      username: '',
      password: '',
      confirmPassword: '',
      phone: '',
      email: '',
      studentId: '',
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
        this.state.surname,
        this.state.username,
        this.state.password,
        this.state.confirmPassword,
        this.state.phone,
        this.state.email,
        this.state.userRole,
        this.state.studentId,
        this.state.scienceDegree,
        this.state.institute,
        this.state.department,
        this.state.group
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
    const {
      classes,
      groups,
      departments,
      institutes,
      scienceDegrees
    } = this.props;
    const {
      passwordError,
      userRole,
      scienceDegree,
      institute,
      group,
      department
    } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {i18n.t('sign_up')}
          </Typography>
          <form className={classes.form} onSubmit={e => this.submit(e)}>
            <InputField
              label={i18n.t('first_name')}
              autoFocus={true}
              onBlur={e => this.setState({ firstName: e.target.value })}
            />
            <InputField
              label={i18n.t('last_name')}
              onBlur={e => this.setState({ lastName: e.target.value })}
            />
            <InputField
              label={i18n.t('surname')}
              onBlur={e => this.setState({ surname: e.target.value })}
            />
            <InputField
              label={i18n.t('user_name')}
              onBlur={e => this.setState({ username: e.target.value })}
            />
            <InputField
              label={i18n.t('phone')}
              onBlur={e => this.setState({ phone: e.target.value })}
            />
            <InputField
              label={i18n.t('email')}
              autoComplete="email"
              onBlur={e => this.setState({ email: e.target.value })}
            />
            <InputField
              label={i18n.t('password')}
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
            <SelectField
              label={i18n.t('user_type')}
              initialValue={userRole}
              values={UserRoles}
              onChange={e => this.setState({ userRole: e })}
            />
            {userRole === '1' && (
              <InputField
                label={i18n.t('student_id')}
                onBlur={e => this.setState({ studentId: e.target.value })}
              />
            )}
            {userRole === '2' && (
              <SelectField
                label={i18n.t('science_degree')}
                initialValue={scienceDegree}
                values={scienceDegrees}
                onChange={e => this.setState({ scienceDegree: e })}
              />
            )}
            <SelectField
              label={i18n.t('institute')}
              initialValue={institute}
              values={institutes}
              onChange={e => this.setState({ institute: e })}
            />
            <SelectField
              label={i18n.t('department')}
              initialValue={department}
              values={departments}
              onChange={e => this.setState({ department: e })}
            />
            {userRole === '1' && (
              <SelectField
                label={i18n.t('group')}
                initialValue={group}
                values={groups}
                onChange={e => this.setState({ group: e })}
              />
            )}
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              type="submit"
            >
              {i18n.t('sign_up')}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href={SIGN_IN} variant="body2">
                  {i18n.t('sign_in_button')}
                </Link>
              </Grid>
            </Grid>
          </form>
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

export default compose(withStyles(useStyles), connect(mapStateToProps))(SignUp);
