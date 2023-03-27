import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {getAdmins} from '../../../../utils/UsersUtil';
import {loadUsersByRole, unAssignRole} from '../../../../actions/userActions';
import {EmptyPage} from '../../../common/components/EmptyPage';
import {ListGroup} from 'react-bootstrap';
import {AdminListItem} from '../components/AdminListItem';
import {ADMIN} from '../../../../constants/userRoles';
import {useFetchUserQuery} from "../../../../store/slices/authApiSlice";
import {selectApiLoading} from "../../../../App";

export default function AdminsList() {

  const dispatch = useDispatch();

  const userId = useFetchUserQuery().data.user.id;
  const users = useSelector(state => getAdmins(Object.values(state.userReducers.users)));

  const isFetching = useSelector(state => state.navigationReducers.isFetching);
  const isNewFetching = useSelector(selectApiLoading);

  useEffect(() => {
    dispatch(loadUsersByRole(ADMIN));
  }, [dispatch])

  function deleteAdminFunc(userId) {
    dispatch(unAssignRole(userId, ADMIN));
  }

  return (
    <ListGroup variant={'flush'}>
      <EmptyPage list={users} isFetching={isFetching || isNewFetching}/>
      {users &&
        users.map(user => (
          <AdminListItem key={user.id}
                         user={user}
                         deleteAdminFunc={deleteAdminFunc}
                         isDeletePresent={user.id !== userId}/>
        ))}
    </ListGroup>
  );
}