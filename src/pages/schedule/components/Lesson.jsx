import React from 'react';
import Typography from '@material-ui/core/Typography';
import { isTeacher } from '../../../utils/UsersUtil';
import { getGroupList } from '../../../utils/ScheduleUtil';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';

export const Lesson = ({ lesson, user, isEditMode = false, deleteLesson }) => {

  return (
    <Grid>

      {isEditMode && <Grid container justify={'flex-end'}>
        <Button onClick={() => deleteLesson(lesson)}>
          <CloseIcon color={'error'}/>
        </Button>
      </Grid>}

      <Typography align={'center'} color='textPrimary'>
        {lesson.subjectName}
      </Typography>
      <Typography align={'center'} variant={'body2'} color='textSecondary'>
        {isTeacher(user) ? getGroupList(lesson.groups) : lesson.teacherName}
      </Typography>
      <Typography align={'center'} variant={'body1'} color='textPrimary'>
        {lesson.lectureHall}
      </Typography>
    </Grid>
  );
};
