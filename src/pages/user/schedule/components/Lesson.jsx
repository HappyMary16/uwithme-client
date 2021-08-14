import React from 'react';
import { isTeacher } from '../../../../utils/UsersUtil';
import { getGroupList } from '../../../../utils/ScheduleUtil';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { TrashFill } from 'react-bootstrap-icons';

export const Lesson = ({ lesson, user, isEditMode = false, deleteLesson }) => {
  return (
    <div className={'lesson'}>
      {isEditMode && (
        <Row>
          <Col
            xs={{ offset: 8, span: 1 }}
            md={{ offset: 8, span: 1 }}
            lg={{ offset: 9, span: 1 }}
          >
            <TrashFill
              className={'delete-icon'}
              onClick={() => deleteLesson(lesson)}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={8}>
          <p className={'text'}>{lesson.subjectName}</p>
          <p className={'secondary-text text'}>{isTeacher(user) ? getGroupList(lesson.groups) : lesson.teacherName}</p>
        </Col>
        <Col xs={4}>
          <p className={'text'}>{lesson.lectureHall}</p>
          <p className={'text'}>{lesson.building}</p>
        </Col>
      </Row>
    </div>
  );
};
