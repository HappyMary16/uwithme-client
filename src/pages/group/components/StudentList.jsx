import {Student} from './Student';
import {Button, Col, Container, ListGroup, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";

export function StudentsList({ students, addStudent, removeStudent }) {

  const {t} = useTranslation("group");

  return (
    <Container>
      <Row>
        <Col xs={12} sm={6} md={8} lg={9}>
          <h5 className={'margin-bottom'}>{t('students')}:</h5>
        </Col>
        <Col>
          <Button onClick={addStudent} variant={'purple'}>
            {t('add_student')}
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
