import {useEffect, useState} from 'react';
import {getCurrentWeek} from '../../../utils/ScheduleUtil';
import {USER_HOME_PAGE} from '../../../constants/links';
import {getName} from '../../../utils/UsersUtil';
import {Col, Row} from 'react-bootstrap';
import {SwitchWeek} from '../../common/components/SwitchWeek';
import {isPageSmallForSchedule} from '../../../utils/PageSizeUtil';
import {ScheduleTable} from './ScheduleTable';
import {SmallScreenSchedule} from './SmallScreenSchedule';
import {useNavigate} from "react-router-dom";
import {SmallAvatar} from "../../common/components/SmallAvatar";

export function Schedule({lessons, user, isEditMode, deleteLesson}) {

  const navigate = useNavigate();

  let [weekNumber, setWeekNumber] = useState(getCurrentWeek() === 1);
  let [isSmall, setSmall] = useState(isPageSmallForSchedule());

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSmall(isPageSmallForSchedule());
    }, true);
  }, [user])

  return (
    <div>
      <Row>
        {user && (
          <Col xs={6} className={'d-flex align-items-center'}>
            <div className='d-flex flex-row justify-content-start clickable-avatar-icon'
                 onClick={() => navigate(USER_HOME_PAGE(user.id))}>
              <SmallAvatar user={user}/>
              <h5>{getName(user)}</h5>
            </div>
          </Col>
        )}
        <Col
          xs={{offset: !user ? 9 : 3, span: 3}}
          md={{offset: !user ? 10 : 4, span: 2}}
          lg={{offset: !user ? 10 : 4, span: 2}}
        >
          <SwitchWeek weekNumber={weekNumber} setWeekNumber={setWeekNumber}/>
        </Col>
      </Row>

      {isSmall && <SmallScreenSchedule lessons={lessons}
                                       user={user}
                                       isEditMode={isEditMode}
                                       deleteLesson={deleteLesson}
                                       weekNumber={weekNumber}/>}

      {!isSmall && <ScheduleTable lessons={lessons}
                                  user={user}
                                  isEditMode={isEditMode}
                                  deleteLesson={deleteLesson}
                                  weekNumber={weekNumber}/>}
    </div>
  );
}
