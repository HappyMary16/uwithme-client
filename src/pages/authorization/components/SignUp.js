import React from 'react';

import { UserRoles } from '../../../constants/userRoles';
import { SIGN_IN } from '../../../constants/links';
import { Copyright } from '../../../components/Copyright';
import { SelectField } from '../../../components/SelectField';

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
import { loadDepartments, loadGroups, loadInstitutes } from '../../../actions';
import { InputField } from '../../../components/InputField';

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

  let [firstName, setFirstName] = React.useState('Mariia');
  let [lastName, setLastName] = React.useState('Borodin');
  let [surname, setSurname] = React.useState('Anatoliivna');
  let [username, setUsername] = React.useState('mariia.borodin');
  let [password, setPassword] = React.useState('1');
  let [confirmPassword, setConfirmPassword] = React.useState('1');
  let [phone, setPhone] = React.useState('0968261865');
  let [email, setEmail] = React.useState('m.borodin.1999@gmail.com');
  let [studentId, setStudentId] = React.useState('1');

  let [passwordError, setPasswordError] = React.useState(false);

  let submit = e => {
    console.log(firstName);
    e.preventDefault();
    console.log(firstName);
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={e => submit(e)}>
          <Grid container spacing={2}>
            <InputField
              label="First Name"
              autoFocus={true}
              onBlur={e => {
                setFirstName(e.target.value);
              }}
            />
            <InputField
              label="Last Name"
              onBlur={e => setLastName(e.target.value)}
            />
            <InputField
              label="Surname"
              onBlur={e => setSurname(e.target.value)}
            />
            <InputField
              label="Username"
              onBlur={e => setUsername(e.target.value)}
            />
            <InputField label="Phone" onBlur={e => setPhone(e.target.value)} />
            <InputField
              label="Email Address"
              autoComplete="email"
              onBlur={e => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              error={passwordError}
              helperText={passwordError ? 'Passwords are not equal' : ''}
              onBlur={e => setPassword(e.target.value)}
            />
            <InputField
              label="Confirm password"
              type="password"
              error={passwordError}
              helperText={passwordError ? 'Passwords are not equal' : ''}
              onChange={e => setConfirmPassword(e.target.value)}
              onBlur={() => setPasswordError(password !== confirmPassword)}
            />
            <SelectField
              label={'User type'}
              initialValue={userRole}
              values={UserRoles}
              onChange={setUserRole}
            />
            {userRole === '1' && (
              <InputField
                label="Student ID"
                onBlur={e => setStudentId(e.target.value)}
              />
            )}
            {userRole === '2' && (
              <SelectField
                label={'Science degree'}
                initialValue={institute}
                values={scienceDegrees}
                onChange={setScienceDegree}
              />
            )}
            <SelectField
              label={'Institute'}
              initialValue={institute}
              values={institutes}
              onChange={setInstitute}
            />
            <SelectField
              label={'Department'}
              initialValue={department}
              values={departments}
              onChange={setDepartment}
            />
            {userRole === '1' && (
              <SelectField
                label={'Group'}
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
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href={SIGN_IN} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>

      <Copyright />
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
