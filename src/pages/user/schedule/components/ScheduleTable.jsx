import React from 'react';
import { Lesson } from './Lesson';
import { LESSONS_TIME, WEEK_DAYS } from '../../../../constants/userRoles';
import { getLesson } from '../../../../utils/ScheduleUtil';
import Table from 'react-bootstrap/Table';

export const ScheduleTable = ({
                                lessons,
                                user,
                                isEditMode = false,
                                deleteLesson,
                                weekNumber
                              }) => {

  return (
    <Table bordered size="sm">
      <thead>
      <tr>
        <th className={'schedule-th'}></th>
        {WEEK_DAYS.map(weekDay => (
          <th className={'schedule-th'} key={weekDay.value}>
            {weekDay.label}
          </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {LESSONS_TIME.map(lessonTime => (
        <tr key={lessonTime.value}>
          <th className={'schedule-th'}>
            {lessonTime.start}
            <br/>
            {lessonTime.end}
          </th>
          {WEEK_DAYS.map(weekDay => {
            let lesson = getLesson(
              lessons,
              weekDay.value,
              lessonTime.value,
              weekNumber ? 1 : 2
            );
            return (
              <td key={weekDay.value} className={'schedule-td'}>
                {lesson && (
                  <Lesson
                    lesson={lesson}
                    user={user}
                    isEditMode={isEditMode}
                    deleteLesson={deleteLesson}
                  />
                )}
              </td>
            );
          })}
        </tr>
      ))}
      </tbody>
    </Table>
  );
};
