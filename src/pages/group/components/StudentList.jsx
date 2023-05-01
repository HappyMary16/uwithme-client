import React from 'react';
import {Student} from './Student';
import i18n from '../../../locales/i18n';
import {Button, Col, Container, ListGroup, Row} from 'react-bootstrap';

export function StudentsList({ students, addStudent, removeStudent }) {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={6} md={8} lg={9}>
          <h5 className={'margin-bottom'}>{i18n.t('students')}:</h5>
        </Col>
        <Col>
          <Button onClick={addStudent} variant={'purple'}>
            {i18n.t('add_student')}
          </Button>
        </Col>
      </Row>

      <ListGroup variant={'flush'}>
        {students &&
          students.map(user => (
            <Student
              key={user.id}
              student={user}
              removeStudent={removeStudent}
            />
          ))}
      </ListGroup>
    </Container>
  );
}
