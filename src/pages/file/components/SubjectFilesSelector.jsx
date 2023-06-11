import {Col, Row} from 'react-bootstrap';
import FilesToChoose from './FilesToChoose';
import i18n from '../../../config/i18n';

export function SubjectFilesSelector({ lectures, tasks, subjectId, handleChoose }) {
  return (
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
  );
}
