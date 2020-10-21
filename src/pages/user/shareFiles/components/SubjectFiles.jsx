import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FilesToChoose from './FilesToChoose';
import i18n from '../../../../locales/i18n';
import Container from 'react-bootstrap/Container';

export const SubjectFiles = ({ lectures, tasks, subjectId, handleChoose }) => {
  return (
    <Container>
      <Row>
        <Col xs={6}>
          <FilesToChoose
            label={i18n.t('lecture')}
            files={lectures.filter(lecture => lecture.subjectId === subjectId)}
            onChange={handleChoose}
          />
        </Col>
        <Col xs={6}>
          <FilesToChoose
            label={i18n.t('task')}
            files={tasks && tasks.filter(task => task.subjectId === subjectId)}
            onChange={handleChoose}
          />
        </Col>
      </Row>
    </Container>
  );
};
