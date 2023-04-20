import {Col, Row} from 'react-bootstrap';
import {ChevronDown, ChevronUp, TrashFill} from 'react-bootstrap-icons';
import React from 'react';

export function ListItem({
  text,
  secondaryText,
  openEnabled = true,
  open,
  icon,
  avatar,
  isDeletePresent,
  deleteFunc,
  deleteFuncParam
}) {
  return (
    <Row>
      {(avatar || icon) && <Col xs={2} sm={1}>
        {avatar && <div>{avatar}</div>}
        {icon && <Row className="justify-content-center">{icon}</Row>}
      </Col>}
      <Col xs={5} sm={8} md={9}>
        <p className={'list-item-text'}>{text}</p>
        {secondaryText && <p className={'secondary-text text'}>{secondaryText}</p>}
      </Col>
      {isDeletePresent && <Col xs={3} sm={2} md={1}>
        <div className={'flex-row d-flex justify-content-end'}>
          <TrashFill
            onClick={e => {
              e.stopPropagation();
              deleteFunc(deleteFuncParam);
            }}
            className={'delete-icon icon'}/>
        </div>
      </Col>}
      {openEnabled && <Col xs={2} sm={1}>
        {open ? <ChevronUp className={'left-button'}/>
          : <ChevronDown className={'left-button'}/>}
      </Col>}
    </Row>
  );
}
