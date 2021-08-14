import React from 'react';
import { WEEK_DAYS } from '../../../../constants/userRoles';
import ListGroup from 'react-bootstrap/ListGroup';
import { SmallScreenDay } from './SmallScreenDay';

export const SmallScreenSchedule = ({
                                      lessons,
                                      user,
                                      isEditMode = false,
                                      deleteLesson,
                                      weekNumber
                                    }) => {

  return (
    <ListGroup variant="flush">
      {WEEK_DAYS.map((day, i) => (
        <SmallScreenDay key={i}
                        day={day}
                        lessons={lessons}
                        weekNumber={weekNumber}
                        user={user}
                        isEditMode={isEditMode}
                        deleteLesson={deleteLesson}/>))}
    </ListGroup>
  );
};
