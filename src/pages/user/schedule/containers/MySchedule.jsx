import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findLessons} from '../../../../actions/scheduleActions';
import {Schedule} from '../components/Schedule';
import {Button, Col, Row} from 'react-bootstrap';
import i18n from '../../../../locales/i18n';
import {ADD_LESSON} from '../../../../constants/links';
import {isTeacher} from '../../../../utils/UsersUtil';
import {useNavigate} from "react-router-dom";

export default function MySchedule() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const lessons = useSelector(state => state.scheduleReducers.lessons);
  const user = useSelector(state => state.authReducers.user);

  useEffect(() => {
    dispatch(findLessons())
  }, [dispatch]);

  return (
    <div>
      {isTeacher(user) && <Row spacing={2}>
        <Col sm={12} md={{offset: 9, span: 3}}>
          <Button
            block
            variant={'purple'}
            onClick={() => navigate(ADD_LESSON)}
          >
            {i18n.t('add_lesson')}
          </Button>
        </Col>
      </Row>}
      <Schedule lessons={lessons} user={user} isMine/>
    </div>
  )
}
