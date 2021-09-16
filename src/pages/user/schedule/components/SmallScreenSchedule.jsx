import React from 'react';
import { WEEK_DAYS } from '../../../../constants/userRoles';
import ListGroup from 'react-bootstrap/ListGroup';
import { SmallScreenDay } from './SmallScreenDay';
import { EmptyPage } from '../../../common/components/EmptyPage';

export const SmallScreenSchedule = ({
                                      lessons,
                                      user,
                                      isEditMode = false,
                                      deleteLesson,
                                      weekNumber
                                    }) => {

  return (
    <div>
      {(!lessons || lessons.length === 0) && <EmptyPage/>}

      {lessons && lessons.length !== 0 &&
      <ListGroup variant='flush'>
        {WEEK_DAYS.map((day, i) => (
          <SmallScreenDay key={i}
                          day={day}
                          lessons={lessons}
                          weekNumber={weekNumber}
                          user={user}
                          isEditMode={isEditMode}
                          deleteLesson={deleteLesson} />))}
      </ListGroup>}
    </div>
  )
};
