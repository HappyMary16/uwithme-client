import React from 'react';
import {
  areLessonsToday,
  getCurrentWeek,
  getGroupList,
  getLessonTime,
  getTodayLessons
} from '../../../../utils/ScheduleUtil';
import i18n from '../../../../locales/i18n';
import {hasRole} from '../../../../utils/UsersUtil';
import {Table} from 'react-bootstrap';
import {SwitchWeek} from '../../../common/components/SwitchWeek';
import {STUDENT, TEACHER} from '../../../../constants/userRoles';

export function TodaySchedule({lessons, user}) {
  const [weekNumber, setWeekNumber] = React.useState(getCurrentWeek() === 1);

  return (
    <div>
      <SwitchWeek weekNumber={weekNumber} setWeekNumber={setWeekNumber}/>
      {!areLessonsToday(lessons, weekNumber ? 1 : 2) && (
        <h5>{i18n.t('no_lessons_today')}</h5>
      )}
      {areLessonsToday(lessons, weekNumber ? 1 : 2) && (
        <Table responsive size="sm">
          <tbody>
          <tr>
            <th>{i18n.t('lesson_time')}</th>
            <th>{i18n.t('subject')}</th>
            <th>{i18n.t('lecture_hall')}</th>
            {hasRole(user, STUDENT) && <th>{i18n.t('teacher')}</th>}
            {hasRole(user, TEACHER) && <th>{i18n.t('group')}</th>}
          </tr>
          {lessons &&
            getTodayLessons(lessons, weekNumber ? 1 : 2).map(lesson => (
              <tr key={lesson.name}>
                <td>{getLessonTime(lesson.lessonTime)}</td>
                <td>{lesson.subjectName}</td>
                <td>{lesson.lectureHall}</td>
                {hasRole(user, STUDENT) && <td>{lesson.teacherName}</td>}
                {hasRole(user, TEACHER) && <td>{getGroupList(lesson.groups)}</td>}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
