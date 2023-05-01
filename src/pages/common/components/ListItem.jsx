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
  deleteFuncParam,
  smSize=1
}) {
  return (
    <Row>
      {(avatar || icon) && <Col xs={2} sm={smSize}>
        {avatar && avatar}
        {icon && icon}
      </Col>}
      <Col className={"d-flex align-items-center"}>
        <p className={'list-item-text'}>{text}</p>
        {secondaryText && <p className={'secondary-text text'}>{secondaryText}</p>}
      </Col>
      {isDeletePresent && <Col xs={3} sm={2} md={1} className={"d-flex align-items-center justify-content-end"}>
          <TrashFill
            onClick={e => {
              e.stopPropagation();
              deleteFunc(deleteFuncParam);
            }}
            className={'delete-icon icon'}/>
      </Col>}
      {openEnabled && <Col xs={2} sm={1} className={"d-flex align-items-center justify-content-end"}>
          {open ? <ChevronUp className={'left-button'}/>
            : <ChevronDown className={'left-button'}/>}
      </Col>}
    </Row>
  );
}
