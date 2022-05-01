import React from 'react';

import { Col, Collapse, ListGroup, Row } from 'react-bootstrap';
import { history } from '../../../../store/Store';
import { GROUP_PAGE } from '../../../../constants/links';
import { PeopleFill } from 'react-bootstrap-icons';

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
                  <PeopleFill className={"icon-color"} size={"1.4em"} />
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
