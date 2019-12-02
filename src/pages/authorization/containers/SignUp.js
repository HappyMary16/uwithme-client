import React from 'react';
import { connect } from 'react-redux';

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

import { signUpRequest } from '../actions/authActions';
import MenuItem from '@material-ui/core/MenuItem';
import { UserTypes } from '../../../constants/userTypes';
import { SIGN_IN } from '../../../constants/links';
import { Copyright } from '../../../components/Copyright';
import Box from '@material-ui/core/Box';

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

let SignUp = ({ dispatch, institutes, departments, groups }) => {
  const classes = useStyles();
  const [userType, setUserType] = React.useState('STUDENT');

  const [institute, setInstitute] = React.useState('Select institute');
  const [department, setDepartment] = React.useState('Select department');
  const [group, setGroup] = React.useState('Select group');

  let firstName = '';
  let lastName = '';
  let email = '';
  let password = '';
  let confirmPassword = '';
  let passwordError = false;

  let submit = e => {
    e.preventDefault();
    //TODO: send correct data
    dispatch(signUpRequest(firstName, lastName, email, password));
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
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => {
                  firstName = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => {
                  lastName = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => {
                  email = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => {
                  password = e.target.value;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                error={passwordError}
                helperText={
                  passwordError
                    ? 'Password and Confirm password should be equal!'
                    : ''
                }
                onChange={e => {
                  confirmPassword = e.target.value;
                }}
                onBlur={() => {
                  passwordError = password !== confirmPassword;
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="userType"
                select
                label="User type"
                value={userType}
                onChange={e => {
                  setUserType(e.target.value);
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              >
                {UserTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="institute"
                select
                label="Institute"
                value={institute}
                onChange={e => {
                  setInstitute(e.target.value);
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              >
                {institutes.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="department"
                select
                label="Department"
                value={department}
                onChange={e => {
                  setDepartment(e.target.value);
                }}
                margin="normal"
                variant="outlined"
                fullWidth
              >
                {departments.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {userType === 'STUDENT' && (
              <Grid item xs={12}>
                <TextField
                  id="group"
                  select
                  label="Group"
                  value={group}
                  onChange={e => {
                    setGroup(e.target.value);
                  }}
                  margin="normal"
                  variant="outlined"
                  fullWidth
                >
                  {groups.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>
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
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    institutes: state.info.institutes,
    departments: state.info.departments,
    groups: state.info.groups
  };
};

SignUp = connect(mapStateToProps)(SignUp);

export default SignUp;
