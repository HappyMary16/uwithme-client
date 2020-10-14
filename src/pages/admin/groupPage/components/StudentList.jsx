import React from 'react';
import { Student } from './Student';
import i18n from '../../../../locales/i18n';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export const StudentsList = ({ students, addStudent, removeStudent }) => {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={6} md={8} lg={9}>
          <h5 className={'margin-bottom'}>{i18n.t('students')}:</h5>
        </Col>
        <Col>
          <Button block onClick={addStudent} variant={'purple'}>
            {i18n.t('add_student')}
          </Button>
        </Col>
      </Row>

      <ListGroup variant="flush">
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
};
