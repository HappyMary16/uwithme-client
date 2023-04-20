import React, {Fragment} from 'react';
import {WEEK_DAYS} from '../../../constants/userRoles';
import {ListGroup} from 'react-bootstrap';
import {SmallScreenDay} from './SmallScreenDay';
import {EmptyPage} from '../../common/components/EmptyPage';

export function SmallScreenSchedule({lessons, user, isEditMode, deleteLesson, weekNumber}) {

  return (
    <Fragment>
      {lessons?.length
        ? <ListGroup variant="flush">
          {WEEK_DAYS.map((day, i) => (
            <SmallScreenDay key={i}
                            day={day}
                            lessons={lessons}
                            weekNumber={weekNumber}
                            user={user}
                            isEditMode={isEditMode}
                            deleteLesson={deleteLesson}/>))}
        </ListGroup>
        : <EmptyPage/>}
    </Fragment>
  )
}
