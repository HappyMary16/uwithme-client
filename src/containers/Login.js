import React from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../actions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

let Login = ({ dispatch }) => {
  let username;
  let password;

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();

        dispatch(loginRequest(username.value, password.value));
        username.value = '';
        password.value = '';
      }}
    >
      <Form.Group controlId="formBasicEmail">
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Enter an username"
            ref={node => {
              username = node;
            }}
          />
          <Form.Control
            type="text"
            placeholder="Enter an password"
            ref={node => {
              password = node;
            }}
          />
          <InputGroup.Append>
            <Button type="submit">Login</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};
Login = connect()(Login);

export default Login;
