import {getGroupList} from '../../../utils/ScheduleUtil';
import {Col, Row} from 'react-bootstrap';
import {TrashFill} from 'react-bootstrap-icons';
import {TEACHER} from '../../../constants/userRoles';
import {selectActiveRole} from "../../../store/user/authSlice";
import {useSelector} from "react-redux";

export function Lesson({ lesson, user, isEditMode = false, deleteLesson }) {

  const activeRole = useSelector(selectActiveRole);

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
          <p>{lesson.subjectName}</p>
          <p className={'secondary-text text'}>
            {!user && activeRole === TEACHER ? getGroupList(lesson.groups) : lesson.teacherName}
          </p>
        </Col>
        <Col xs={4}>
          <p>{lesson.lectureHall}</p>
          <p>{lesson.building}</p>
        </Col>
      </Row>
    </div>
  );
}
