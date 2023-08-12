import {Col, Row} from 'react-bootstrap';
import FilesToChoose from './FilesToChoose';
import {useTranslation} from "react-i18next";

export function SubjectFilesSelector({ lectures, tasks, subjectId, handleChoose }) {

  const {t} = useTranslation("file");

  return (
      <Row>
        <Col xs={6}>
          <FilesToChoose
            label={t('lecture')}
            files={lectures.filter(lecture => lecture.subjectId === subjectId)}
            onChange={handleChoose}
          />
        </Col>
        <Col xs={6}>
          <FilesToChoose
            label={t('task')}
            files={tasks && tasks.filter(task => task.subjectId === subjectId)}
            onChange={handleChoose}
          />
        </Col>
      </Row>
  );
}
