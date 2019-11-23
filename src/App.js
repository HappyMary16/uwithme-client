import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Route } from 'react-router-dom';

import AddToDo from './containers/AddToDo';
import ToDoListContainer from './containers/ToDoListContainer';
import Callback from './containers/Callback';
import NavigationContainer from './containers/NavigationContainer';
import Login from './containers/Login';

class App extends Component {
  render() {
    return (
      <Container>
        <Row className="row">
          <Col xs={12}>
            <h1>To Do List</h1>
            <NavigationContainer />
            <Route exact path="/" component={ToDoListContainer} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/new-item" component={AddToDo} />
            <Route exact path="/callback" component={Callback} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
