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
import Switch from 'react-switch';
import { lightGreyColor, switchWeek } from '../../../common/styles/styles';
import Grid from '@material-ui/core/Grid';
import { getCurrentWeek, getLesson } from '../../../utils/ScheduleUtil';
import i18n from '../../../locales/i18n';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { history } from '../../../store/Store';
import { USER_HOME_PAGE } from '../../../constants/links';
import { getName } from '../../../utils/UsersUtil';

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(2)
  },
  switchSpacing: {
    marginBottom: theme.spacing(2)
  },
  cell: {
    borderColor: '#D3D3D3',
    borderWidth: '1px',
    borderLeftStyle: 'solid'
  }
}));

export const ScheduleTable = ({ lessons, user, isMine, isEditMode = false, deleteLesson }) => {
  let classes = useStyles();
  let [weekNumber, setWeekNumber] = React.useState(getCurrentWeek() === 1);

  return (
    <Container className={classes.table}>
      <Grid container
            direction='row'
            justify={!isMine ? 'space-between' : 'flex-end'}
            className={classes.switchSpacing}>
        {!isMine &&
        <Button onClick={() => history.push(USER_HOME_PAGE(user.id))}
                color='primary'
                variant='text'
                size='medium'>
          {getName(user)}
        </Button>}
        <Grid>
          <Typography>
            {i18n.t('week')}
          </Typography>
          <Switch
            offColor={lightGreyColor}
            onColor={lightGreyColor}
            checked={weekNumber}
            onChange={() => setWeekNumber(!weekNumber)}
            uncheckedIcon={<div style={switchWeek}>
              2
            </div>}
            checkedIcon={<div style={switchWeek}>
              1
            </div>}
            className='react-switch'
            id='icon-switch'
          />
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              {WEEK_DAYS.map(weekDay =>
                <TableCell key={weekDay.value} align='center' className={classes.cell}>
                  {weekDay.label}
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              LESSONS_TIME.map(lessonTime =>
                <TableRow key={lessonTime.value}>
                  <TableCell component='th' scope='row'>
                    {lessonTime.label}
                  </TableCell>
                  {WEEK_DAYS.map(weekDay => {
                      let lesson = getLesson(lessons, weekDay.value, lessonTime.value, weekNumber ? 1 : 2);
                    return (<TableCell key={weekDay.value} component='th' scope='row' className={classes.cell}>
                      {lesson &&
                      <Lesson lesson={lesson} user={user} isEditMode={isEditMode} deleteLesson={deleteLesson}/>}
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
