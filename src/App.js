import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Route } from 'react-router-dom';

import Callback from './containers/Callback';
import NavigationContainer from './containers/NavigationContainer';
import { USER_HOME, SIGN_IN, SIGN_UP, FILES } from './constants/links';
import SingUpContainer from './pages/authorization/containers/SingUpContainer';
import SingInContainer from './pages/authorization/containers/SignInContainer';
import StudentContainer from './pages/student/containers/StudentContainer';
import Grid from '@material-ui/core/Grid';
import { StudentToolBar } from './pages/student/components/StudentToolBar';
import { StudentFiles } from './pages/student/components/StudentFiles';

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="row">
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
                  <Route exact path={FILES} component={StudentFiles} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Row>
      </Container>
    );
  }
}

export default App;
