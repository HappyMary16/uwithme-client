import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { areLessonsToday, filterAndSortLessons, getGroupList, getLessonTime } from '../../../utils/ScheduleUtil';
import i18n from '../../../locales/i18n';
import { isStudent, isTeacher } from '../../../utils/UsersUtil';

const useStyles2 = makeStyles({
  root: {
    width: '100%'
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

export const TodaySchedule = ({ lessons, day, user, weekNumber }) => {
  const classes = useStyles2();

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table aria-label='custom pagination table'>
          <TableBody>
            <TableRow>
              <TableCell align={'center'} component='th'>
                {i18n.t('lesson_time')}
              </TableCell>
              <TableCell align={'center'} component='th'>
                {i18n.t('subject')}
              </TableCell>
              <TableCell align={'center'} component='th'>
                {i18n.t('lecture_hall')}
              </TableCell>
              {isStudent(user) &&
              <TableCell align={'center'} component='th'>
                {i18n.t('teacher')}
              </TableCell>}
              {isTeacher(user) &&
              <TableCell align={'center'} component='th'>
                {i18n.t('group')}
              </TableCell>}
            </TableRow>
            {lessons && filterAndSortLessons(lessons, day, weekNumber).map(lesson => (
              <TableRow key={lesson.name}>
                <TableCell align={'center'} component='td' scope='row'>
                  {getLessonTime(lesson.lessonTime)}
                </TableCell>
                <TableCell align={'center'} component='td'>
                  {lesson.subjectName}
                </TableCell>
                <TableCell align={'center'} component='td'>
                  {lesson.lectureHall}
                </TableCell>
                {isStudent(user) &&
                <TableCell align={'center'} component='td'>
                  {lesson.teacherName}
                </TableCell>}
                {isTeacher(user) &&
                <TableCell align={'center'} component='td'>
                  {getGroupList(lesson.groups)}
                </TableCell>}
              </TableRow>
            ))}
            {!areLessonsToday(lessons, day) && (
              <TableRow><TableCell></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};
