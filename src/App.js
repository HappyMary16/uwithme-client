import React from 'react';
import { Route } from 'react-router-dom';

import NavigationContainer from './common/containers/NavigationContainer';
import {
  ADD_FILE,
  ADD_UNIVERSITY_PATH,
  FILES,
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
import { Preloader } from './common/components/Loader';
import { Copyright } from './common/components/Copyright';
import SignUp from './pages/authorization/containers/SignUp';
import AddUniversity from './pages/administration/containers/AddUniversity';

let App = ({ user, isFetching }) => {
  return (
    <Container style={{ height: '100vh' }}>
      {isFetching !== 0 && <Preloader />}
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
                <UserToolBar />
              </Grid>

              <Grid item xs={10}>
                <Route exact path={USER_HOME} component={UserContainer} />
                <Route exact path={FILES} component={PageWithFiles} />
                <Route exact path={ADD_FILE} component={AddFile} />
                <Route exact path={SHARE_FILES} component={ShareFiles} />
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
