import React from 'react';
import { getName, hasRole } from '../../../../utils/UsersUtil';
import { SmallAvatar } from '../../../common/components/SmallAvatar';
import { STUDENT, TEACHER } from '../../../../constants/userRoles';
import { ListItem } from '../../../common/components/ListItem';
import { ListGroup } from 'react-bootstrap';
import { history } from '../../../../store/Store';
import { USER_HOME_PAGE } from '../../../../constants/links';

export const AdminListItem = ({ user, deleteAdminFunc, isDeletePresent }) => {
  let handleClick = () => {
    if (hasRole(user, TEACHER) || hasRole(user, STUDENT)) {
      history.push(USER_HOME_PAGE(user.id));
    }
  };

  return (
    <ListGroup.Item action onClick={handleClick}>
      <ListItem openEnabled={false}
                icon={<SmallAvatar avatar={user.avatar} />}
                text={getName(user)}
                secondaryText={hasRole(user, TEACHER) ? user.departmentName : user.studyGroupName}
                isDeletePresent={isDeletePresent}
                deleteFunc={deleteAdminFunc}
                deleteFuncParam={user.id} />
    </ListGroup.Item>
  );
};
