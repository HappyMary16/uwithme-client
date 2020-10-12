import React from 'react';
import { isTeacher } from '../../../../utils/UsersUtil';
import { getGroupList } from '../../../../utils/ScheduleUtil';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { XCircle } from 'react-bootstrap-icons';

export const Lesson = ({ lesson, user, isEditMode = false, deleteLesson }) => {
  return (
    <div>
      {isEditMode && (
        <Row>
          <Col
            xs={{ offset: 8, span: 1 }}
            md={{ offset: 8, span: 1 }}
            lg={{ offset: 9, span: 1 }}
          >
            <XCircle className={'icon'} onClick={() => deleteLesson(lesson)}/>
          </Col>
        </Row>
      )}
      <Row className={'lesson'}>
        <Col xs={8}>
          {lesson.subjectName}
          <br/>
          {isTeacher(user) ? getGroupList(lesson.groups) : lesson.teacherName}
        </Col>
        <Col xs={4}>
          {lesson.lectureHall}
          <br/>
          {lesson.building}
        </Col>
      </Row>
    </div>
  );
};
