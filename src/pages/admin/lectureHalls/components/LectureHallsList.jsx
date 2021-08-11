import React from "react";
import i18n from "../../../../locales/i18n";
import Collapse from "react-bootstrap/Collapse";
import ListGroup from "react-bootstrap/ListGroup";
import { DoorOpenFill } from "react-bootstrap-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const LectureHallsList = ({ lectureHalls, open }) => {
  return (
    <Collapse in={open}>
      <ListGroup>
        {lectureHalls &&
          lectureHalls.map((lectureHall, i) => (
            <ListGroup.Item className={"padding-left"} key={i}>
              <Row>
                <Col xs={2} sm={1}>
                  <Row className="justify-content-center">
                    <DoorOpenFill
                      size={"1.5em"}
                      class={"icon-color margin-top"}
                    />
                  </Row>
                </Col>
                <Col>
                  <p className={"text"}>{lectureHall.label}</p>
                  <p className={"secondary-text text"}>
                    {i18n.t("place_number") + ": " + lectureHall.placeNumber}
                  </p>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Collapse>
  );
};
