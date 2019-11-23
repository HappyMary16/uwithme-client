import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Fragment } from 'react';
import Button from 'react-bootstrap/Button';
import { logout } from '../actions';

const NavigationBar = styled.div`
  margin-bottom: 15px;
  background-color: lightgray;
`;

const Profile = styled.span`
  margin-left: 15px;
`;

const ProfilePicture = styled.img`
  border-radius: 50%;
  max-width: 30px;
  margin-right: 5px;
`;

export default ({ user }) => (
  <NavigationBar>
    <Link className="btn btn-primary" to="/">
      To-Do List
    </Link>
    <Link className="btn btn-secondary" to="/new-item">
      + Add New
    </Link>
    {!user && (
      <Link className="btn btn-secondary" to="/login">
        Login
      </Link>
    )}
    {user && (
      <Fragment>
        <Button onClick={logout()}>Logout</Button>
        <Profile>
          <ProfilePicture src={user.profile.picture} />
          {user.profile.email}
        </Profile>
      </Fragment>
    )}
  </NavigationBar>
);
