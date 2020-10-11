import React from 'react';
import i18n from '../../../../locales/i18n';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import { DoorOpenFill } from 'react-bootstrap-icons';

export const LectureHallsList = ({ lectureHalls, open }) => {
  return (
    <Collapse in={open}>
      <ListGroup className={'padding-left'}>
        {lectureHalls && lectureHalls.map((lectureHall, i) => (
          <ListGroup.Item key={i}>
            <DoorOpenFill/>
            {' ' + lectureHall.label
            + ' (' + i18n.t('place_number') + ': '
            + lectureHall.placeNumber + ')'}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Collapse>
  );
};
