import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import FilesToChoose from './FilesToChoose';
import i18n from '../../../../locales/i18n';

export function SubjectFiles({ lectures, tasks, subjectId, handleChoose }) {
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
}
