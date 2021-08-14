import Col from 'react-bootstrap/Col';
import { ChevronDown, ChevronUp, TrashFill } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import React from 'react';

export const ListItem = ({ text, secondaryText, open, icon, iconText, openEnabled = true, isDeletePresent, deleteFunc, deleteFuncParam }) => {
  return (
    <Row>
      {(!!icon || !!iconText) && <Col xs={2} sm={1}>
        {!!icon && <Row className="justify-content-center">{icon}</Row>}
        {!!iconText && <Row className="justify-content-center">{iconText}</Row>}
      </Col>}
      <Col>
        <p className={'text'}>{text}</p>
        {secondaryText && <p className={'secondary-text text'}>{secondaryText}</p>}
      </Col>
      {isDeletePresent && <Col xs={2} sm={1}> <TrashFill
        onClick={e => {
          e.stopPropagation();
          deleteFunc(deleteFuncParam);
        }}
        className={'delete-icon icon'}
        size={'1.6em'}
      />
      </Col>}
      {openEnabled && <Col xs={2} sm={1}>
        {open ? <ChevronUp class={'left-button'}/>
          : <ChevronDown class={'left-button'}/>}
      </Col>}
    </Row>
  );
};
