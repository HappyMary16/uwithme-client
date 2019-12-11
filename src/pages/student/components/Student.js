import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TodaySchedule } from './TodaySchedule';
import { Copyright } from '../../../components/Copyright';
import { StudentCard } from './StudentCard';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2, 0, 0, 2)
  },
  image: {
    width: 200,
    height: 200
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
}));

export const Student = ({ student, schedules }) => {
  const classes = useStyles();

  return (
    <Grid container xs={12} direction={'column'} className={classes.root}>
      <Grid xs={12} className={classes.paper}>
        <StudentCard student={student} />
      </Grid>
      <Grid xs={12} className={classes.paper}>
        <Typography variant="h4" gutterBottom>
          Schedule
        </Typography>
        <TodaySchedule schedules={schedules} />
      </Grid>
      <Grid xs={12} className={classes.paper}>
        <Copyright />
      </Grid>
    </Grid>
  );
};