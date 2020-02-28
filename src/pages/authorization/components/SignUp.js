import React from 'react';

import { UserRoles } from '../../../common/constants/userRoles';
import { SIGN_IN } from '../../../common/constants/links';
import { SelectField } from '../../../common/components/SelectField';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { signUpRequest } from '../actions/authActions';
import { connect } from 'react-redux';
import {
  loadDepartments,
  loadGroups,
  loadInstitutes
} from '../../../common/actions';
import { InputField } from '../../../common/components/InputField';
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
}));

let SignUp = ({
  dispatch,
  institutes,
  departments,
  scienceDegrees,
  groups
}) => {
  dispatch(loadInstitutes());
  dispatch(loadDepartments());
  dispatch(loadGroups());

  let classes = useStyles();

  let [institute, setInstitute] = React.useState('1');
  let [department, setDepartment] = React.useState('1');
  let [group, setGroup] = React.useState('1');
  let [userRole, setUserRole] = React.useState('1');
  let [scienceDegree, setScienceDegree] = React.useState('1');

  let [firstName, setFirstName] = React.useState('');
  let [lastName, setLastName] = React.useState('');
  let [surname, setSurname] = React.useState('');
  let [username, setUsername] = React.useState('');
  let [password, setPassword] = React.useState('');
  let [confirmPassword, setConfirmPassword] = React.useState('');
  let [phone, setPhone] = React.useState('');
  let [email, setEmail] = React.useState('');
  let [studentId, setStudentId] = React.useState('');

  let [passwordError, setPasswordError] = React.useState(false);

  let submit = e => {
    e.preventDefault();
    dispatch(
      signUpRequest(
        firstName,
        lastName,
        surname,
        username,
        password,
        confirmPassword,
        phone,
        email,
        userRole,
        studentId,
        scienceDegree,
        institute,
        department,
        group
      )
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {i18n.t('sign_up')}
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => submit(e)}>
          <Grid container spacing={2}>
            <InputField
              label={i18n.t('first_name')}
              autoFocus={true}
              onBlur={e => {
                setFirstName(e.target.value);
              }}
            />
            <InputField
              label={i18n.t('last_name')}
              onBlur={e => setLastName(e.target.value)}
            />
            <InputField
              label={i18n.t('surname')}
              onBlur={e => setSurname(e.target.value)}
            />
            <InputField
              label={i18n.t('user_name')}
              onBlur={e => setUsername(e.target.value)}
            />
            <InputField
              label={i18n.t('phone')}
              onBlur={e => setPhone(e.target.value)}
            />
            <InputField
              label={i18n.t('email')}
              autoComplete="email"
              onBlur={e => setEmail(e.target.value)}
            />
            <InputField
              label={i18n.t('password')}
              type="password"
              error={passwordError}
              helperText={passwordError ? i18n.t('password_error') : ''}
              onBlur={e => setPassword(e.target.value)}
            />
            <InputField
              label={i18n.t('confirm_password')}
              type="password"
              error={passwordError}
              helperText={passwordError ? i18n.t('password_error') : ''}
              onChange={e => setConfirmPassword(e.target.value)}
              onBlur={() => setPasswordError(password !== confirmPassword)}
            />
            <SelectField
              label={i18n.t('user_type')}
              initialValue={userRole}
              values={UserRoles}
              onChange={setUserRole}
            />
            {userRole === '1' && (
              <InputField
                label={i18n.t('student_id')}
                onBlur={e => setStudentId(e.target.value)}
              />
            )}
            {userRole === '2' && (
              <SelectField
                label={i18n.t('science_degree')}
                initialValue={institute}
                values={scienceDegrees}
                onChange={setScienceDegree}
              />
            )}
            <SelectField
              label={i18n.t('institute')}
              initialValue={institute}
              values={institutes}
              onChange={setInstitute}
            />
            <SelectField
              label={i18n.t('department')}
              initialValue={department}
              values={departments}
              onChange={setDepartment}
            />
            {userRole === '1' && (
              <SelectField
                label={i18n.t('group')}
                initialValue={group}
                values={groups}
                onChange={setGroup}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
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
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    institutes: state.infoReducers.institutes,
    departments: state.infoReducers.departments,
    groups: state.infoReducers.groups,
    scienceDegrees: state.infoReducers.scienceDegrees
  };
};

export const SingUp = connect(mapStateToProps)(SignUp);
