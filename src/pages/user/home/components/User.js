import React from 'react';
import { TodaySchedule } from './TodaySchedule';
import { UserCard } from './UserCard';
import Container from 'react-bootstrap/Container';

export const User = ({ user, avatar, lessons, isMine, onSaveAvatar }) => {
  return (
    <div>
      <Container>
        <UserCard user={user} avatar={avatar} onSaveAvatar={onSaveAvatar} />
      </Container>
      <Container>
        <TodaySchedule isMine={isMine} lessons={lessons} user={user} />
      </Container>
    </div>
  );
};
