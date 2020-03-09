import React from 'react';
import { Route } from 'react-router-dom';

import NavigationContainer from './common/containers/NavigationContainer';
import {
  ADD_FILE,
  ADD_LESSON,
  ADD_UNIVERSITY_PATH,
  FILES,
  SCHEDULE,
  SHARE_FILES,
  SIGN_IN,
  SIGN_UP,
  USER_HOME
} from './common/constants/links';
import UserContainer from './pages/student/containers/UserContainer';
import { UserToolBar } from './pages/student/components/UserToolBar';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddFile from './pages/files/add/containers/AddFile';
import { SingIn } from './pages/authorization/containers/SignIn';
import { connect } from 'react-redux';
import ShareFiles from './pages/files/share/containers/ShareFiles';
import PageWithFiles from './pages/files/view/containers/PageWithFiles';
import { Copyright } from './common/components/Copyright';
import SignUp from './pages/authorization/containers/SignUp';
import AddUniversity from './pages/administration/containers/AddUniversity';
import { isAdmin, isTeacher } from './common/utils/UsersUtil';
import { AdminToolBar } from './pages/administration/components/AdminToolBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import makeStyles from '@material-ui/core/styles/makeStyles';
import InstitutesList from './pages/administration/containers/InstitutesList';
import AddLesson from './pages/schedule/containers/AddLesson';
import ScheduleTable from './pages/schedule/containers/ScheduleTable';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

let App = ({ user, isFetching }) => {
  const classes = useStyles();

  return (
    <Container style={{ height: '100vh' }}>
      <Backdrop className={classes.backdrop} open={isFetching !== 0}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid
        container
        xs={12}
        alignContent="space-between"
        style={{ height: '100%' }}
      >
        <Grid container xs={12} alignContent={'flex-start'}>
          <Grid item xs={12}>
            <NavigationContainer />
          </Grid>

          {!user && (
            <Grid container xs={12}>
              <Route exact path={SIGN_IN} component={SingIn} />
              <Route
                exact
                path={ADD_UNIVERSITY_PATH}
                component={AddUniversity}
              />
              <Route exact path={SIGN_UP} component={SignUp} />
            </Grid>
          )}

          {user && (
            <Grid container xs={12}>
              <Grid item xs={2}>
                {!isAdmin(user) && <UserToolBar />}
                {isAdmin(user) && <AdminToolBar />}
              </Grid>

              <Grid item xs={10}>
                <Route exact path={SCHEDULE} component={ScheduleTable} />

                {!isAdmin(user) && (
                  <Grid>
                    <Route exact path={USER_HOME} component={UserContainer} />
                    <Route exact path={FILES} component={PageWithFiles} />
                  </Grid>
                )}

                {isTeacher(user) && (
                  <Grid>
                    <Route exact path={ADD_FILE} component={AddFile} />
                    <Route exact path={SHARE_FILES} component={ShareFiles} />
                  </Grid>
                )}

                {isAdmin(user) && (
                  <Grid>
                    <Route exact path={USER_HOME} component={InstitutesList} />
                    <Route exact path={ADD_LESSON} component={AddLesson} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid container justify={'center'} xs={12}>
          <Copyright />
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    isFetching: state.loadingProcess.isFetching
  };
};

export default App = connect(mapStateToProps)(App);
