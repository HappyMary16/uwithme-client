import React from 'react';
import '../../styles/navigation.css';
import {Col, Image, Nav, Row} from 'react-bootstrap';
import {MenuIcon} from '../../icons/MenuIcon';
import {SwitchAccountPanel} from './SwitchAccoutPanel';
import {useFetchUserQuery} from "../../store/user/userApiSlice";
import {getId} from "../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import uwmLogo from "../../assets/UniversityWithMeLongLogo.png"

export function TopToolBar({onMenuClick}) {

  const user = useFetchUserQuery(getId() ?? skipToken).data;

  return (
    <Nav className={"app-bar"}>
      {user && (
        <Col xs={2} sm={1}>
          <MenuIcon onClick={onMenuClick}/>
        </Col>
      )}

      <Col>
        {user
          ? <Row className="justify-content-center">
            <Image src={uwmLogo} alt="" title="institute" className={"app-icon"}/>
          </Row>
          : <Image src={uwmLogo} alt="" title="institute" className={"app-icon"}/>
        }
      </Col>

      {user && (
        <Col xs={2} sm={1}>
          <SwitchAccountPanel/>
        </Col>
      )}
    </Nav>
  );
}
