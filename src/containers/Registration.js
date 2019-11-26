import React from 'react';
import { connect } from 'react-redux';
import { loginRequest, registrationRequest } from '../actions';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

let Registration = ({ dispatch }) => {
  let username;
  let password;

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();

        dispatch(registrationRequest(username.value, password.value));
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
            <Button type="submit">Registration</Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};
Registration = connect()(Registration);

export default Registration;
