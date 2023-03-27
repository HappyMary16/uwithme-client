import React, {useEffect} from 'react';
import { getCurrentWeek } from '../../../../utils/ScheduleUtil';
import { USER_HOME_PAGE } from '../../../../constants/links';
import { getName } from '../../../../utils/UsersUtil';
import { Col, Row } from 'react-bootstrap';
import { SwitchWeek } from '../../../common/components/SwitchWeek';
import { PersonFill } from 'react-bootstrap-icons';
import { isPageSmallForSchedule } from '../../../../utils/PageSizeUtil';
import { ScheduleTable } from './ScheduleTable';
import { SmallScreenSchedule } from './SmallScreenSchedule';
import {useNavigate} from "react-router-dom";

export function Schedule({lessons, user, isMine, isEditMode, deleteLesson}) {

  const navigate = useNavigate();

  let [weekNumber, setWeekNumber] = React.useState(getCurrentWeek() === 1);
  let [isSmall, setSmall] = React.useState(isPageSmallForSchedule());

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSmall(isPageSmallForSchedule());
    }, true);
  }, [user])

  return (
    <div>
      <Row>
        {!isMine && (
          <Col xs={6} className='justify-content-center'>
            <Row>
              <PersonFill
                size={'1.7em'}
                onClick={() => navigate(USER_HOME_PAGE(user.id))}
                className={'icon'}
              />
              <h5>{getName(user)}</h5>
            </Row>
          </Col>
        )}
        <Col
          xs={{ offset: isMine ? 9 : 3, span: 3 }}
          md={{ offset: isMine ? 10 : 4, span: 2 }}
          lg={{ offset: isMine ? 10 : 4, span: 2 }}
        >
          <SwitchWeek weekNumber={weekNumber} setWeekNumber={setWeekNumber} />
        </Col>
      </Row>

      {isSmall && <SmallScreenSchedule lessons={lessons}
                                       user={user}
                                       isEditMode={isEditMode}
                                       deleteLesson={deleteLesson}
                                       weekNumber={weekNumber} />}

      {!isSmall && <ScheduleTable lessons={lessons}
                                  user={user}
                                  isEditMode={isEditMode}
                                  deleteLesson={deleteLesson}
                                  weekNumber={weekNumber} />}
    </div>
  );
}
