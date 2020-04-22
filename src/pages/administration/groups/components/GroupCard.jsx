import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import i18n from '../../../locales/i18n';
import { getName } from '../../../utils/UsersUtil';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1)
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

export const GroupCard = ({ group }) => {
  const classes = useStyles();

  return (
    <Paper>
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
    </Paper>
  );
};
