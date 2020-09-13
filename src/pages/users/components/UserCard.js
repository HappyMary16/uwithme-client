import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import i18n from '../../../locales/i18n';
import { getName } from '../../../utils/UsersUtil';
import LoadPhoto from './LoadPhoto';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1)
  }
}));

export const UserCard = ({ user, onSaveAvatar }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  let handleClickAvatar = () => {
    setOpen(true);
  };

  let handleSave = (avatar) => {
    setOpen(false);
    onSaveAvatar(avatar);
  };

  return (
    <Paper>
      <LoadPhoto onSave={handleSave} open={open} onClose={() => setOpen(false)}/>

      <Grid container spacing={2}>
        <Grid item className={classes.container}>
          <ButtonBase className={'image'}>
            <img
              className={'img'}
              alt='photo'
              //TODO set saved avatar
              src='/empty-avatar.jpg'
              onClick={handleClickAvatar}
            />
          </ButtonBase>
        </Grid>

        <Grid item xs={12} sm container className={classes.container}>
          <Grid item xs container direction='column' spacing={2}>
            <Typography gutterBottom variant='h5'>
              {getName(user)}
            </Typography>
            <Typography variant='body2' gutterBottom>
              {i18n.t('phone')}: {user.phone}
            </Typography>
            <Typography variant='body2' gutterBottom>
              {i18n.t('email')}: {user.email}
            </Typography>
            <Typography variant='body2' gutterBottom>
              {i18n.t('institute')}: {user.instituteName}
            </Typography>
            <Typography variant='body2' gutterBottom>
              {i18n.t('department')}: {user.departmentName}
            </Typography>
            {user.role === 1 && (
              <Typography variant='body2' gutterBottom>
                {i18n.t('group')}: {user.studyGroupName}
              </Typography>
            )}
            {user.role === 2 && (
              <Typography variant='body2' gutterBottom>
                {i18n.t('science_degree')}: {user.scienceDegreeName}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
