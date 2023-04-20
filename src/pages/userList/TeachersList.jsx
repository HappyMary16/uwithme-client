import {useSelector} from 'react-redux';
import React from 'react';
import {UsersList} from './components/UsersList';
import {TEACHER} from '../../constants/userRoles';
import {selectApiLoading} from "../../App";
import {useFetchUsersQuery} from "../../store/user/userApiSlice";

export default function TeachersList() {

  const {data: users} = useFetchUsersQuery({role: TEACHER});

  const isFetching = useSelector(selectApiLoading);

  return (
    <UsersList users={users} isFetching={isFetching}/>
  );
}
