import React from 'react';
import { getName } from '../../../../utils/UsersUtil';
import { USER_HOME_PAGE } from '../../../../constants/links';
import { history } from '../../../../store/Store';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TrashFill } from 'react-bootstrap-icons';
import Image from 'react-bootstrap/Image';

export const Student = ({ student, removeStudent }) => {
  let handleClick = () => {
    history.push(USER_HOME_PAGE(student.id));
  };

  return (
    <ListGroup.Item action onClick={handleClick}>
      <Row>
        <Col xs={2} sm={1}>
          <Image
            roundedCircle
            alt="photo"
            src={
              student.avatar === undefined || student.avatar === null
                ? '/empty-avatar.jpg'
                : student.avatar
            }
            className={'small-avatar'}
          />
        </Col>
        <Col xs={8} sm={10}>
          {getName(student)}
        </Col>
        <Col xs={2} sm={1}>
          <TrashFill
            onClick={e => {
              e.stopPropagation();
              removeStudent(student);
            }}
            className={'icon'}
            size={22}
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
