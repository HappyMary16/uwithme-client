import React from 'react';
import { Route } from 'react-router-dom';

import NavigationContainer from './containers/NavigationContainer';
import {
  USER_HOME,
  SIGN_IN,
  SIGN_UP,
  FILES,
  ADD_FILE,
  SHARE_FILES
} from './constants/links';
import UserContainer from './pages/student/containers/UserContainer';
import { StudentToolBar } from './pages/student/components/StudentToolBar';
import PageWithFilesContainer from './pages/files/containers/PageWithFilesContainer';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddFile from './pages/files/containers/AddFile';
import { SingIn } from './pages/authorization/components/SignIn';
import { SingUp } from './pages/authorization/components/SignUp';
import { connect } from 'react-redux';
import ShareFiles from './pages/files/containers/ShareFiles';

let App = ({ user }) => {
  return (
    <Container>
      <Grid container xs={12}>
        <Grid item xs={12}>
          <NavigationContainer />
        </Grid>
        <Grid item xs={12}>
          <Grid container xs={12}>
            {user && (
              <Grid item xs={2}>
                <StudentToolBar />
              </Grid>
            )}
            <Grid item xs={10}>
              {!user && <Route exact path={SIGN_IN} component={SingIn} />}
              {!user && <Route exact path={SIGN_UP} component={SingUp} />}

              {user && (
                <Route exact path={USER_HOME} component={UserContainer} />
              )}

              {user && (
                <Route exact path={FILES} component={PageWithFilesContainer} />
              )}

              {user && <Route exact path={ADD_FILE} component={AddFile} />}

              {<Route exact path={SHARE_FILES} component={ShareFiles} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authReducers.user
  };
};

export default App = connect(mapStateToProps)(App);
