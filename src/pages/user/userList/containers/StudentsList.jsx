import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {loadUsersByRole} from '../../../../actions/userActions';
import {getStudents} from '../../../../utils/UsersUtil';
import {UsersList} from '../components/UsersList';
import {STUDENT} from '../../../../constants/userRoles';
import {selectApiLoading} from "../../../../App";

export default function StudentsList() {

  const dispatch = useDispatch();

  const users = useSelector(state => getStudents(Object.values(state.userReducers.users)));

  const isFetching = useSelector(state => state.navigationReducers.isFetching);
  const isNewFetching = useSelector(selectApiLoading);

  useEffect(() => {
    dispatch(loadUsersByRole(STUDENT));
  }, [dispatch])

  return (
    <UsersList users={users} isFetching={isFetching || isNewFetching}/>
  );
}
