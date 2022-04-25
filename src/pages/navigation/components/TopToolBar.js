import React from 'react';
import '../../../styles/navigation.css';
import { Col, Nav, Row } from 'react-bootstrap';
import { MenuIcon } from '../../icons/MenuIcon';
import { SwitchAccountPanel } from './SwitchAccoutPanel';

export const TopToolBar = ({ user, avatar, signOutFunc, openMenu, updateUserRoleFunc }) => {
  return (
    <Nav className={"app-bar"}>
      {user && (
        <Col xs={2} sm={1}>
          <MenuIcon onClick={openMenu()} />
        </Col>
      )}
      {user && (
        <Col>
          <Row className="justify-content-center">
            <img
              src="./UniversityWithMeLongLogo.png"
              alt=""
              title="institute"
              className={"app-icon"}
            />
          </Row>
        </Col>
      )}
      {!user && (
        <Col>
          <img
            src="./UniversityWithMeLongLogo.png"
            alt=""
            title="institute"
            className={"app-icon"}
          />
        </Col>
      )}
      {user && (
        <Col xs={2}>
          <SwitchAccountPanel avatar={avatar} user={user} signOutFunc={signOutFunc} updateUserRoleFunc={updateUserRoleFunc}/>
        </Col>
      )}
    </Nav>
  );
};
