import {Collapse, ListGroup} from 'react-bootstrap';
import React from 'react';
import {getGroupList, getLessonTime} from '../../../utils/ScheduleUtil';
import {ListItem} from '../../common/components/ListItem';
import {hasRole} from '../../../utils/UsersUtil';
import {TEACHER} from '../../../constants/userRoles';

export function LessonList({ lessons, open, user, isEditMode, deleteLesson }) {
  return (
    <Collapse in={open}>
      <ListGroup variant={'flush'}>
        {lessons?.map((lesson, i) => (
          <ListGroup.Item key={i} className={'padding-left-x2'}>
            <ListItem openEnabled={false}
                      icon={getLessonTime(lesson.lessonTime)}
                      text={lesson.subjectName + ' (' + (hasRole(user, TEACHER) ? getGroupList(lesson.groups) : lesson.teacherName) + ')'}
                      secondaryText={lesson.lectureHall + ' ' + lesson.building}
                      isDeletePresent={isEditMode}
                      deleteFunc={deleteLesson}
                      deleteFuncParam={lesson}/>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Collapse>
  );
}