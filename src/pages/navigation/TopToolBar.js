import React from 'react';
import '../../styles/navigation.css';
import {Col, Nav, Row} from 'react-bootstrap';
import {MenuIcon} from '../icons/MenuIcon';
import {SwitchAccountPanel} from './components/SwitchAccoutPanel';
import {useFetchUserQuery} from "../../store/user/userApiSlice";
import {getId} from "../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";

export function TopToolBar({onMenuClick}) {

  const user = useFetchUserQuery(getId() ?? skipToken).data;

  return (
    <Nav className={"app-bar"}>
      {user && (
        <Col xs={2} sm={1}>
          <MenuIcon onClick={onMenuClick}/>
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
          <SwitchAccountPanel/>
        </Col>
      )}
    </Nav>
  );
}
