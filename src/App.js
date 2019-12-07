import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import NavigationContainer from './containers/NavigationContainer';
import {
  USER_HOME,
  SIGN_IN,
  SIGN_UP,
  FILES,
  ADD_FILE
} from './constants/links';
import SingUpContainer from './pages/authorization/containers/SingUpContainer';
import SingInContainer from './pages/authorization/containers/SignInContainer';
import StudentContainer from './pages/student/containers/StudentContainer';
import { StudentToolBar } from './pages/student/components/StudentToolBar';
import PageWithFilesContainer from './pages/files/containers/PageWithFilesContainer';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import AddFile from './pages/files/containers/AddFile';

class App extends Component {
  render() {
    return (
      <Container>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <NavigationContainer />
          </Grid>
          <Grid item xs={12}>
            <Grid container xs={12}>
              <Grid item xs={2}>
                <StudentToolBar />
              </Grid>
              <Grid item xs={10}>
                <Route exact path={USER_HOME} component={StudentContainer} />
                <Route exact path={SIGN_IN} component={SingInContainer} />
                <Route exact path={SIGN_UP} component={SingUpContainer} />
                <Route exact path={FILES} component={PageWithFilesContainer} />

                <Route exact path={ADD_FILE} component={AddFile} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default App;
