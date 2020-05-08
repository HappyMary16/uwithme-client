import React from 'react';
import List from '@material-ui/core/List';
import { Student } from './Student';
import i18n from '../../../locales/i18n';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { buttonColor } from '../../../common/styles/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

export const StudentsList = ({ students, addStudent }) => {

  const classes = useStyles();

  return (
    <Paper>
      <Grid xs={12} container direction='column' className={classes.container}>
        <Grid item>
          <Grid container direction='row' justify='space-between' alignItems='center'>
            <Typography variant='body1' gutterBottom>
              {i18n.t('students')}:
            </Typography>
            <Button
              style={{
                backgroundColor: buttonColor,
                marginRight: '10px'
              }}
              onClick={addStudent}
              color="primary"
              variant="outlined"
              className={classes.link}
              size='small'>
              {i18n.t('add_student')}
            </Button>
          </Grid>
        </Grid>

        <List>
          {students && students.map(user => <Student key={user.id} student={user}/>)}
        </List>
      </Grid>
    </Paper>
  );
};