import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';
import React from 'react';
import { getGroupList, getLessonTime } from '../../../../utils/ScheduleUtil';
import { ListItem } from '../../../common/components/ListItem';
import { isTeacher } from '../../../../utils/UsersUtil';

export const LessonList = ({ lessons, open, user, isEditMode, deleteLesson }) => {
  return (
    <Collapse in={open}>
      <ListGroup>
        {!!lessons && lessons.map((lesson, i) => (
          <ListGroup.Item
            className={'padding-left-x2'}
            key={i}
          >
            <ListItem openEnabled={false}
                      iconText={getLessonTime(lesson.lessonTime)}
                      text={lesson.subjectName + ' (' + (isTeacher(user) ? getGroupList(lesson.groups) : lesson.teacherName) + ')'}
                      secondaryText={lesson.lectureHall + ' ' + lesson.building}
                      isDeletePresent={isEditMode}
                      deleteFunc={deleteLesson}
                      deleteFuncParam={lesson}/>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Collapse>
  );
};