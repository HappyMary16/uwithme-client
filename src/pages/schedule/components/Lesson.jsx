import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export const Lesson = ({ lesson }) => {

  return (
    <Card>
      <CardContent>
        <Typography color="textPrimary">
          {lesson.subjectName}
        </Typography>
        <Typography color="textPrimary">
          {lesson.lectureHall}
        </Typography>
        <Typography color="textSecondary">
          {lesson.teacherName}
        </Typography>
      </CardContent>
    </Card>
  );
};
