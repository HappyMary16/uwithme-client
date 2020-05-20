import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TodaySchedule } from '../../schedule/components/TodaySchedule';
import { UserCard } from './UserCard';
import i18n from '../../../locales/i18n';
import Switch from 'react-switch';
import { getCurrentWeek } from '../../../utils/ScheduleUtil';
import { lightGreyColor, switchWeek } from '../../../common/styles/styles';
import { Container } from '@material-ui/core';
import { USER_SCHEDULE } from '../../../constants/links';
import { history } from '../../../store/Store';
import Button from '@material-ui/core/Button';

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

export const User = ({ user, lessons, isMine }) => {
  const classes = useStyles();

  //TODO add opportunity to choose day
  const [weekDay, setWeekDay] = React.useState(new Date().getDay());
  const [weekNumber, setWeekNumber] = React.useState(getCurrentWeek() === 1);

  return (
    <Grid container xs={12} direction='column' className={classes.root}>
      <Container className={classes.paper}>
        <UserCard user={user}/>
      </Container>
      <Container className={classes.paper}>
        <Grid container xs={12} direction='row' justify='space-between'>
          <Grid>
            <Typography variant="h4">
              {i18n.t('schedule')}
            </Typography>
            {!isMine &&
            <Button onClick={() => history.push(USER_SCHEDULE(user.id))}
                    color="primary"
                    variant="text"
                    size='small'>
              {i18n.t('open')}
            </Button>}
          </Grid>
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
              className="react-switch"
              id="icon-switch"
            />
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.paper}>
        <TodaySchedule lessons={lessons} day={weekDay} user={user} weekNumber={weekNumber ? 1 : 2}/>
      </Container>
    </Grid>
  );
};
