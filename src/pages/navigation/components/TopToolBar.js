import React from "react";
import Nav from "react-bootstrap/Nav";
import "../../../styles/navigation.css";
import { ThreeBarsIcon } from "@primer/octicons-react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { LogOutIcon } from "./LogOutIcon";

export const TopToolBar = ({ user, signOutFunc, openMenu }) => {
  return (
    <Nav className={"app-bar"}>
      {user && (
        <Col xs={2} sm={1}>
          <div onClick={openMenu()}>
            <ThreeBarsIcon size={35} className={"menu-icon icon"} />
          </div>
        </Col>
      )}
      {user && (
        <Col xs={8} sm={10}>
          <Row className="justify-content-center">
            <img
              src="/UniversityWithMeLongLogo.png"
              alt=""
              title="institute"
              className={"app-icon"}
            />
          </Row>
        </Col>
      )}
      {!user && (
        <Col xs={10} sm={11}>
          <img
            src="/UniversityWithMeLongLogo.png"
            alt=""
            title="institute"
            className={"app-icon"}
          />
        </Col>
      )}
      {user && (
        <Col xs={2} sm={1}>
          <Row className="justify-content-end">
            <LogOutIcon onClick={signOutFunc()} />
          </Row>
        </Col>
      )}
    </Nav>
  );
};
