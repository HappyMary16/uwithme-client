import React from 'react';
import { getName } from '../../../utils/UsersUtil';
import { USER_HOME_PAGE, USER_SCHEDULE } from '../../../constants/links';
import { history } from '../../../store/Store';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import { CalendarWeekFill } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import { SmallAvatar } from '../../common/components/SmallAvatar';

export const TeacherListItem = ({ teacher }) => {
  let handleClick = () => {
    history.push(USER_HOME_PAGE(teacher.id));
  };

  return (
    <ListGroup.Item action onClick={handleClick}>
      <Row>
        <Col xs={2} sm={1}>
          <SmallAvatar avatar={teacher.avatar} />
        </Col>
        <Col xs={8} sm={10}>
          <p>{getName(teacher)}</p>
          <p className={'secondary-text text'}>{teacher.scienceDegree}</p>
        </Col>
        <Col xs={2} sm={1}>
          <CalendarWeekFill
            onClick={e => {
              e.stopPropagation();
              history.push(USER_SCHEDULE(teacher.id));
            }}
            className={'icon'}
            size={22}
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
