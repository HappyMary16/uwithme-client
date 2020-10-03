import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import { isTeacher } from '../../../utils/UsersUtil';
import { getGroupList } from '../../../utils/ScheduleUtil';

export const Lesson = ({ lesson, user }) => {

  return (
    <ThemeProvider>
      <Typography align={'center'} color='textPrimary'>
        {lesson.subjectName}
      </Typography>
      <Typography align={'center'} variant={'h6'} color='textPrimary'>
        {lesson.lectureHall}
      </Typography>
      <Typography align={'center'} variant={'body2'} color='textSecondary'>
        {isTeacher(user) ? getGroupList(lesson.groups) : lesson.teacherName}
      </Typography>
    </ThemeProvider>
  );
};
