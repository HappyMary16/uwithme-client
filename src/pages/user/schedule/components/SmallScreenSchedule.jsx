import React from 'react';
import { WEEK_DAYS } from '../../../../constants/userRoles';
import { ListGroup } from 'react-bootstrap';
import { SmallScreenDay } from './SmallScreenDay';
import { EmptyPage } from '../../../common/components/EmptyPage';

export function SmallScreenSchedule({lessons, user, isEditMode, deleteLesson, weekNumber}) {

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
}
