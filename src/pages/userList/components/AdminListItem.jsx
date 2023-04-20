import React from 'react';
import {getName, hasRole} from '../../../utils/UsersUtil';
import {SmallAvatar} from '../../common/components/SmallAvatar';
import {STUDENT, TEACHER} from '../../../constants/userRoles';
import {ListItem} from '../../common/components/ListItem';
import {ListGroup} from 'react-bootstrap';
import {USER_HOME_PAGE} from '../../../constants/links';
import {useNavigate} from "react-router-dom";

export function AdminListItem({ user, deleteAdminFunc, isDeletePresent }) {

  const navigate = useNavigate();

  let handleClick = () => {
    if (hasRole(user, TEACHER) || hasRole(user, STUDENT)) {
      navigate(USER_HOME_PAGE(user.id));
    }
  };

  return (
    <ListGroup.Item action onClick={handleClick}>
      <ListItem openEnabled={false}
                avatar={<SmallAvatar user={user} />}
                text={getName(user)}
                secondaryText={hasRole(user, TEACHER) ? user.departmentName : user.studyGroupName}
                isDeletePresent={isDeletePresent}
                deleteFunc={deleteAdminFunc}
                deleteFuncParam={user.id} />
    </ListGroup.Item>
  );
}
