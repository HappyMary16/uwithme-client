import {useSelector} from 'react-redux';
import {Schedule} from './component/Schedule';
import {Button, Col, Row} from 'react-bootstrap';
import i18n from '../../config/i18n';
import {ADD_LESSON} from '../../constants/links';
import {useNavigate} from "react-router-dom";
import {selectActiveRole} from "../../store/user/authSlice";
import {TEACHER} from "../../constants/userRoles";
import {getId} from "../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchLessonsQuery} from "../../store/lesson/lessonApiSlice";

export default function MySchedule() {

  const navigate = useNavigate();

  const {data: lessons} = useFetchLessonsQuery(getId() ?? skipToken);
  const activeRole = useSelector(selectActiveRole);

  return (
    <div>
      {activeRole === TEACHER && <Row spacing={2}>
        <Col sm={12} md={{offset: 9, span: 3}}>
          <Button variant={'purple'} onClick={() => navigate(ADD_LESSON)}>
            {i18n.t('add_lesson')}
          </Button>
        </Col>
      </Row>}
      <Schedule lessons={lessons}/>
    </div>
  )
}
