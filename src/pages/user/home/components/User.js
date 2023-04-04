import React from 'react';
import {TodaySchedule} from './TodaySchedule';
import {UserCard} from './UserCard';
import {Container} from 'react-bootstrap';

export function User({user, lessons, isMine, onSaveAvatar, toScheduleFunc}) {
  return (
    <div>
      <Container>
        <UserCard
          user={user}
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
