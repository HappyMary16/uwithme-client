import React from 'react';
import {
  areLessonsToday,
  filterAndSortLessons,
  getCurrentWeek,
  getGroupList,
  getLessonTime
} from '../../../../utils/ScheduleUtil';
import i18n from '../../../../locales/i18n';
import { isStudent, isTeacher } from '../../../../utils/UsersUtil';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { history } from '../../../../store/Store';
import { USER_SCHEDULE } from '../../../../constants/links';
import Row from 'react-bootstrap/Row';
import { SwitchWeek } from '../../../common/components/SwitchWeek';

export const TodaySchedule = ({ isMine, lessons, day, user }) => {
  const [weekNumber, setWeekNumber] = React.useState(getCurrentWeek() === 1);

  return (
    <div>
      <Row>
        <Col xs={6}>
          <h3>{i18n.t('schedule')}</h3>
          {!isMine && (
            <Button
              onClick={() => history.push(USER_SCHEDULE(user.id))}
              variant={'purple'}
            >
              {i18n.t('open')}
            </Button>
          )}
        </Col>
        <Col
          xs={{ offset: 3, span: 3 }}
          md={{ offset: 4, span: 2 }}
          lg={{ offset: 5, span: 1 }}
        >
          <SwitchWeek weekNumber={weekNumber} setWeekNumber={setWeekNumber} />
        </Col>
      </Row>
      {!areLessonsToday(lessons, day, weekNumber ? 1 : 2) && (
        <h5>{i18n.t('no_lessons_today')}</h5>
      )}
      {areLessonsToday(lessons, day, weekNumber ? 1 : 2) && (
        <Table responsive size="sm">
          <tbody>
            <tr>
              <th>{i18n.t('lesson_time')}</th>
              <th>{i18n.t('subject')}</th>
              <th>{i18n.t('lecture_hall')}</th>
              {isStudent(user) && <th>{i18n.t('teacher')}</th>}
              {isTeacher(user) && <th>{i18n.t('group')}</th>}
            </tr>
            {lessons &&
              filterAndSortLessons(lessons, day, weekNumber ? 1 : 2).map(
                lesson => (
                  <tr key={lesson.name}>
                    <td>{getLessonTime(lesson.lessonTime)}</td>
                    <td>{lesson.subjectName}</td>
                    <td>{lesson.lectureHall}</td>
                    {isStudent(user) && <td>{lesson.teacherName}</td>}
                    {isTeacher(user) && <td>{getGroupList(lesson.groups)}</td>}
                  </tr>
                )
              )}
          </tbody>
        </Table>
      )}
    </div>
  );
};
