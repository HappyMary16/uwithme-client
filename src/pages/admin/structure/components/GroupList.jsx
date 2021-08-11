import React from "react";

import ListGroup from "react-bootstrap/ListGroup";
import Collapse from "react-bootstrap/Collapse";
import { history } from "../../../../store/Store";
import { GROUP_PAGE } from "../../../../constants/links";
import { PeopleFill } from "react-bootstrap-icons";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const GroupList = ({ groups, open }) => {
  return (
    <Collapse in={open}>
      <ListGroup>
        {groups.map((group, i) => (
          <ListGroup.Item
            className={"padding-left-x2"}
            key={i}
            action
            onClick={() => history.push(GROUP_PAGE(group.value))}
          >
            <Row>
              <Col xs={2} sm={1}>
                <Row className="justify-content-center">
                  <PeopleFill class={"icon-color"} size={"1.4em"} />
                </Row>
              </Col>
              <Col>{group.label}</Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Collapse>
  );
};
