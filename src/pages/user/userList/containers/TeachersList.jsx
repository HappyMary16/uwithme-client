import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {loadUsersByRole} from '../../../../actions/userActions';
import {getTeachers} from '../../../../utils/UsersUtil';
import {UsersList} from '../components/UsersList';
import {TEACHER} from '../../../../constants/userRoles';
import {selectApiLoading} from "../../../../App";

export default function TeachersList() {

  const dispatch = useDispatch();

  const users = useSelector(state => getTeachers(Object.values(state.userReducers.users)));

  const isFetching = useSelector(state => state.navigationReducers.isFetching);
  const isNewFetching = useSelector(selectApiLoading);

  useEffect(() => {
    dispatch(loadUsersByRole(TEACHER));
  }, [dispatch])

  return (
    <UsersList users={users} isFetching={isFetching || isNewFetching}/>
  );
}
