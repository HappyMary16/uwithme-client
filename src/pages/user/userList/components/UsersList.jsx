import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { EmptyPage } from '../../../common/components/EmptyPage';
import { UserListItem } from './UserListItem';

export const UsersList = ({ users, role, isFetching }) => {

  return (
    <ListGroup variant={'flush'}>
      <EmptyPage list={users} isFetching={isFetching} />
      {users &&
      users.map(user => (
        <UserListItem key={user.id} user={user} role={role} />
      ))}
    </ListGroup>
  );
};
