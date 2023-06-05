import React from 'react';
import {Lesson} from './Lesson';
import {getLesson} from '../../../utils/ScheduleUtil';
import {Table} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import {getLocalizedWeekDays, LESSONS_TIME} from "../../../constants/schedule";

export function ScheduleTable({lessons, user, isEditMode, deleteLesson, weekNumber}) {

  const {t} = useTranslation();

  return (
    <Table bordered size="sm">
      <thead>
      <tr>
        <th className={'schedule-th'}></th>
        {getLocalizedWeekDays(t).map(weekDay => (
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
          {getLocalizedWeekDays(t).map(weekDay => {
            let lesson = getLesson(
              lessons,
              weekDay.value,
              lessonTime.value,
              weekNumber ? 1 : 2
            )
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
            )
          })}
        </tr>
      ))}
      </tbody>
    </Table>
  );
}
