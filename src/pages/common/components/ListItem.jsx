import {Col, Row} from 'react-bootstrap';
import {ChevronDown, ChevronUp, TrashFill} from 'react-bootstrap-icons';
import React from 'react';

export function ListItem({
  text, secondaryText, openEnabled = true, open, icon,
  iconText, isDeletePresent, deleteFunc, deleteFuncParam}) {
  return (
    <Row>
      {(!!icon || !!iconText) && <Col xs={2} sm={1}>
        {!!icon && <Row className="justify-content-center">{icon}</Row>}
        {!!iconText && <Row className="justify-content-center">{iconText}</Row>}
      </Col>}
      <Col>
        <p className={'list-item-text'}>{text}</p>
        {secondaryText && <p className={'secondary-text text'}>{secondaryText}</p>}
      </Col>
      {isDeletePresent && <Col xs={2} sm={1}> <TrashFill
        onClick={e => {
          e.stopPropagation();
          deleteFunc(deleteFuncParam);
        }}
        className={'delete-icon icon'}
        size={'1.4em'}
      />
      </Col>}
      {openEnabled && <Col xs={2} sm={1}>
        {open ? <ChevronUp className={'left-button'}/>
          : <ChevronDown className={'left-button'}/>}
      </Col>}
    </Row>
  );
}
