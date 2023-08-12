import {getName, hasRole} from '../../../utils/UsersUtil';
import {USER_HOME_PAGE, USER_SCHEDULE} from '../../../constants/links';
import {Col, ListGroup, Row} from 'react-bootstrap';
import {SmallAvatar} from '../../common/components/SmallAvatar';
import {CalendarWeekFill} from 'react-bootstrap-icons';
import {STUDENT, TEACHER} from '../../../constants/userRoles';
import {useNavigate} from "react-router-dom";

export function UserListItem({ user }) {

  const navigate = useNavigate();

  let handleClick = () => {
    navigate(USER_HOME_PAGE(user.id));
  };

  return (
    <ListGroup.Item action onClick={handleClick}>
      <Row>
        <Col xs={2} sm={1}>
          <SmallAvatar user={user} />
        </Col>
        <Col xs={8} sm={10}>
          <p>{getName(user)}</p>
          {hasRole(user, STUDENT) && <p className={'secondary-text text'}>{user.studyGroupName}</p>}
          {hasRole(user, TEACHER) && <p className={'secondary-text text'}>{user.departmentName}</p>}
        </Col>
        <Col xs={2} sm={1}>
          <CalendarWeekFill
            onClick={e => {
              e.stopPropagation();
              navigate(USER_SCHEDULE(user.id));
            }}
            className={'icon'}
            size={22}
          />
        </Col>
      </Row>
    </ListGroup.Item>
  );
}
