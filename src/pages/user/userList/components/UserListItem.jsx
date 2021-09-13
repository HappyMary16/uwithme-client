import React from 'react';
import { getName } from '../../../../utils/UsersUtil';
import { USER_HOME_PAGE, USER_SCHEDULE } from '../../../../constants/links';
import { history } from '../../../../store/Store';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';
import { SmallAvatar } from '../../../common/components/SmallAvatar';
import { CalendarWeekFill } from 'react-bootstrap-icons';
import Row from 'react-bootstrap/Row';
import { STUDENT, TEACHER } from '../../../../constants/userRoles';

export const UserListItem = ({ user, role }) => {
  let handleClick = () => {
    history.push(USER_HOME_PAGE(user.id));
  };

  return (
    <ListGroup.Item action onClick={handleClick}>
      <Row>
        <Col xs={2} sm={1}>
          <SmallAvatar avatar={user.avatar} />
        </Col>
        <Col xs={8} sm={10}>
          <p>{getName(user)}</p>
          {role === STUDENT && <p className={'secondary-text text'}>{user.studyGroupName}</p>}
          {role === TEACHER && <p className={'secondary-text text'}>{user.scienceDegree}</p>}
        </Col>
        <Col xs={2} sm={1}>
          <CalendarWeekFill
            onClick={e => {
              e.stopPropagation();
              history.push(USER_SCHEDULE(user.id));
            }}
            className={'icon'}
            size={22}
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
