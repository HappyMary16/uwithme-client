import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Route } from 'react-router-dom';

import ToDoListContainer from './containers/ToDoListContainer';
import Callback from './containers/Callback';
import NavigationContainer from './containers/NavigationContainer';
import SignIn from './pages/authorization/containers/SignIn';
import SignUp from './pages/authorization/containers/SignUp';
import { SIGN_IN, SIGN_UP } from './constants/links';

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="row">
          <Col xs={12}>
            <NavigationContainer />
            <Route exact path="/" component={ToDoListContainer} />
            <Route exact path={SIGN_IN} component={SignIn} />
            <Route exact path={SIGN_UP} component={SignUp} />
            <Route exact path="/callback" component={Callback} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
