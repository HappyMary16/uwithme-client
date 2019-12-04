import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Route } from 'react-router-dom';

import Callback from './containers/Callback';
import NavigationContainer from './containers/NavigationContainer';
import { SIGN_IN, SIGN_UP } from './constants/links';
import SingUpContainer from './pages/authorization/containers/SingUpContainer';
import SingInContainer from './pages/authorization/containers/SignInContainer';
import StudentContainer from './pages/student/containers/StudentContainer';
import Grid from '@material-ui/core/Grid';

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="row">
          <Grid xs={12}>
            <NavigationContainer />
            <Route exact path="/" component={StudentContainer} />
            <Route exact path={SIGN_IN} component={SingInContainer} />
            <Route exact path={SIGN_UP} component={SingUpContainer} />
            <Route exact path="/callback" component={Callback} />
          </Grid>
        </Row>
      </Container>
    );
  }
}

export default App;
