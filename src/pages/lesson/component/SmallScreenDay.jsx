import React, {Fragment} from 'react';
import {ListGroup} from 'react-bootstrap';
import {ListItem} from '../../common/components/ListItem';
import {LessonList} from './LessonList';
import {Calendar2CheckFill} from 'react-bootstrap-icons';
import {getLessons} from '../../../utils/ScheduleUtil';

export function SmallScreenDay({ day, lessons, weekNumber, user, isEditMode, deleteLesson }) {

  let [open, setOpen] = React.useState(false);

  return (
    <Fragment>
      <ListGroup.Item
        className={'padding-left'}
        action
        onClick={() => setOpen(!open)}>
        <ListItem
          open={open}
          text={day.label}
          icon={<Calendar2CheckFill className={'icon-color'}/>}/>
      </ListGroup.Item>

      <LessonList open={open}
                  lessons={getLessons(lessons, day.value, weekNumber ? 1 : 2)}
                  user={user}
                  isEditMode={isEditMode}
                  deleteLesson={deleteLesson}/>
    </Fragment>
  );
}