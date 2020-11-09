import React from 'react';
import { TodaySchedule } from './TodaySchedule';
import { UserCard } from './UserCard';
import Container from 'react-bootstrap/Container';

export const User = ({ user, avatar, lessons, isMine, onSaveAvatar }) => {
  //TODO add opportunity to choose day
  const [weekDay, setWeekDay] = React.useState(new Date().getDay());

  return (
    <div>
      <Container>
        <UserCard user={user} avatar={avatar} onSaveAvatar={onSaveAvatar} />
      </Container>
      <Container>
        <TodaySchedule
          isMine={isMine}
          lessons={lessons}
          day={weekDay}
          user={user}
        />
      </Container>
    </div>
  );
};
