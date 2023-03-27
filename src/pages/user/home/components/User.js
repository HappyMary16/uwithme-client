import React from 'react';
import { TodaySchedule } from './TodaySchedule';
import { UserCard } from './UserCard';
import { Container } from 'react-bootstrap';

export function User({user, avatar, lessons, isMine, onSaveAvatar, toScheduleFunc}) {
  return (
    <div>
      <Container>
        <UserCard
          user={user}
          avatar={avatar}
          onSaveAvatar={onSaveAvatar}
          isMine={isMine}
          toScheduleFunc={toScheduleFunc}
        />
      </Container>
      <Container>
        <TodaySchedule lessons={lessons} user={user} />
      </Container>
    </div>
  );
}
