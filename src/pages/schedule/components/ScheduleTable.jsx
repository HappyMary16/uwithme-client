import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableContainer from '@material-ui/core/TableContainer';
import { Container } from '@material-ui/core';
import { Lesson } from './Lesson';
import { makeStyles } from '@material-ui/core/styles';
import { LESSONS_TIME, WEEK_DAYS } from '../../../constants/userRoles';

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(2)
  },
  cell: {
    borderColor: '#D3D3D3',
    borderWidth: '1px',
    borderLeftStyle: 'solid'
  }
}));

let lessonFilter = (lesson, weekDay, lessonTime) => {
  return lesson.weekDay === weekDay && lesson.lessonTime === lessonTime;
};

let getLesson = (lessons, weekDay, lessonTime) => {
  let filteredLessons = Array.isArray(lessons) && lessons.filter(lesson => lessonFilter(lesson, weekDay, lessonTime));

  if (Array.isArray(filteredLessons) && filteredLessons.length) {
    return filteredLessons[0];
  }
};

export const ScheduleTable = ({ lessons }) => {
  let classes = useStyles();

  return (
    <Container className={classes.table}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              {WEEK_DAYS.map(weekDay =>
                <TableCell key={weekDay.value} align="center" className={classes.cell}>
                  {weekDay.label}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              LESSONS_TIME.map(lessonTime =>
                <TableRow key={lessonTime.value}>
                  <TableCell component="th" scope="row">
                    {lessonTime.label}
                  </TableCell>
                  {WEEK_DAYS.map(weekDay => {
                    let lesson = getLesson(lessons, weekDay.value, lessonTime.value);
                    return (<TableCell key={weekDay.value} component="th" scope="row" className={classes.cell}>
                      {lesson && <Lesson lesson={lesson}/>}
                    </TableCell>);
                  }
                  )}
                </TableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
