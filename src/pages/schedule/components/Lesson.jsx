import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';
import { isTeacher } from '../../../utils/UsersUtil';

export const Lesson = ({ lesson, user }) => {

  return (
    <ThemeProvider>
      <Typography align={'center'} color="textPrimary">
        {lesson.subjectName}
      </Typography>
      <Typography align={'center'} variant={'h6'} color="textPrimary">
        {lesson.lectureHall}
      </Typography>
      <Typography align={'center'} variant={'body2'} color="textSecondary">
        {isTeacher(user) ? lesson.groupName : lesson.teacherName}
      </Typography>
    </ThemeProvider>
  );
};
