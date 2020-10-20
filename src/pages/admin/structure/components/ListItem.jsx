import Col from 'react-bootstrap/Col';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import React from 'react';

export const ListItem = ({ text, secondaryText, open, icon }) => {
  return (
    <Row>
      <Col xs={2} sm={1}>
        <Row className="justify-content-center">{icon}</Row>
      </Col>
      <Col xs={8} sm={10}>
        <p className={'text'}>{text}</p>
        {secondaryText && (
          <p className={'secondary-text text'}>{secondaryText}</p>
        )}
      </Col>
      <Col xs={2} sm={1}>
        {open ? (
          <ChevronUp class={'leftButton'} />
        ) : (
          <ChevronDown class={'leftButton'} />
        )}
      </Col>
    </Row>
  );
};
