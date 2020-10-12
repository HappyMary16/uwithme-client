import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { TodaySchedule } from './TodaySchedule';
import { UserCard } from './UserCard';
import i18n from '../../../../locales/i18n';
import Switch from 'react-switch';
import { getCurrentWeek } from '../../../../utils/ScheduleUtil';
import { lightGreyColor } from '../../../../styles/styles';
import { Container } from '@material-ui/core';
import { USER_SCHEDULE } from '../../../../constants/links';
import { history } from '../../../../store/Store';
import Button from '@material-ui/core/Button';
import '../../../../styles/userPage.css';

export const User = ({ user, lessons, isMine, onSaveAvatar }) => {
  //TODO add opportunity to choose day
  const [weekDay, setWeekDay] = React.useState(new Date().getDay());
  const [weekNumber, setWeekNumber] = React.useState(getCurrentWeek() === 1);

  return (
    <Grid container xs={12} direction="column">
      <Container className={'paper'}>
        <UserCard user={user} onSaveAvatar={onSaveAvatar}/>
      </Container>
      <Container className={'paper'}>
        <Grid container xs={12} direction="row" justify="space-between">
          <Grid>
            <Typography variant="h4">{i18n.t('schedule')}</Typography>
            {!isMine && (
              <Button
                onClick={() => history.push(USER_SCHEDULE(user.id))}
                color="primary"
                variant="text"
                size="small"
              >
                {i18n.t('open')}
              </Button>
            )}
          </Grid>
          <Grid>
            <Typography>{i18n.t('week')}</Typography>
            <Switch
              offColor={lightGreyColor}
              onColor={lightGreyColor}
              checked={weekNumber}
              onChange={() => setWeekNumber(!weekNumber)}
              uncheckedIcon={<div className={'switch-week'}>2</div>}
              checkedIcon={<div className={'switch-week'}>1</div>}
              className="react-switch"
              id="icon-switch"
            />
          </Grid>
        </Grid>
      </Container>
      <Container className={'paper'}>
        <TodaySchedule
          lessons={lessons}
          day={weekDay}
          user={user}
          weekNumber={weekNumber ? 1 : 2}
        />
      </Container>
    </Grid>
  );
};
