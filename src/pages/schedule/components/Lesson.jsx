import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';

export const Lesson = ({ lesson }) => {

  return (
    <ThemeProvider>
      <Typography align={'center'} color="textPrimary">
          {lesson.subjectName}
        </Typography>
      <Typography align={'center'} variant={'h6'} color="textPrimary">
          {lesson.lectureHall}
        </Typography>
      <Typography align={'center'} variant={'body2'} color="textSecondary">
          {lesson.teacherName}
        </Typography>
    </ThemeProvider>
  );
};
