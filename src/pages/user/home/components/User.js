import React from 'react';
import {TodaySchedule} from './TodaySchedule';
import {UserCard} from './UserCard';
import {Container} from 'react-bootstrap';

export function User({user, lessons, isMine}) {
  return (
    <div>
      <Container>
        <UserCard
          user={user}
          isMine={isMine}
        />
      </Container>
      <Container>
        <TodaySchedule lessons={lessons} user={user} />
      </Container>
    </div>
  );
}
