import React from 'react';
import { isTeacher } from '../../../../utils/UsersUtil';
import { getGroupList } from '../../../../utils/ScheduleUtil';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { XCircle } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';

export const Lesson = ({ lesson, user, isEditMode = false, deleteLesson }) => {
  return (
    <Container className={'lesson'}>
      {isEditMode && (
        <Row>
          <Col
            xs={{ offset: 8, span: 1 }}
            md={{ offset: 8, span: 1 }}
            lg={{ offset: 9, span: 1 }}
          >
            <XCircle
              className={'delete-icon'}
              onClick={() => deleteLesson(lesson)}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col xs={8}>
          {lesson.subjectName}
          <br />
          {isTeacher(user) ? getGroupList(lesson.groups) : lesson.teacherName}
        </Col>
        <Col xs={4}>
          {lesson.lectureHall}
          <br />
          {lesson.building}
        </Col>
      </Row>
    </Container>
  );
};
