import {useSelector} from 'react-redux';
import React from 'react';
import {EmptyPage} from '../common/components/EmptyPage';
import {ListGroup} from 'react-bootstrap';
import {AdminListItem} from './components/AdminListItem';
import {ADMIN} from '../../constants/userRoles';
import {selectApiLoading} from "../../App";
import {useFetchUsersQuery, useUnAssignUserRoleMutation} from "../../store/user/userApiSlice";
import {getId} from "../../services/authService";

export default function AdminsList() {

  const [unAssignRole] = useUnAssignUserRoleMutation();

  const {data: users} = useFetchUsersQuery({role: ADMIN});

  const isFetching = useSelector(selectApiLoading);

  function deleteAdminFunc(userId) {
    unAssignRole({userId, role: ADMIN});
  }

  return (
    <ListGroup variant={'flush'}>
      <EmptyPage list={users} isFetching={isFetching}/>
      {users &&
        users.map(user => (
          <AdminListItem key={user.id}
                         user={user}
                         deleteAdminFunc={deleteAdminFunc}
                         isDeletePresent={user.id !== getId()}/>
        ))}
    </ListGroup>
  );
}