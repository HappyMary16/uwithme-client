import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import i18n from '../../../locales/i18n';
import Button from '@material-ui/core/Button';
import { history } from '../../../store/Store';
import { GROUP_SCHEDULE, USER_HOME_PAGE } from '../../../constants/links';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { getName } from '../../../utils/UsersUtil';
import { textColor } from '../../../common/styles/styles';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

export const GroupCard = ({ group, groupTeacher }) => {
  const classes = useStyles();

  return (
    <Paper>

      <Grid xs={12} container direction='column' alignItems='flex-start' spacing={2} className={classes.container}>

        <Typography gutterBottom variant='h5'>
          {group.label}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {i18n.t('institute')}: {group.instituteName}
        </Typography>
        <Typography variant='body1' gutterBottom>
          {i18n.t('department')}: {group.departmentName}
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              color='primary'
              disabled={true}
              checked={group.isShowingInRegistration}/>}
          label={i18n.t('show_in_registration')}/>

        <Typography variant='body1' gutterBottom>
          {i18n.t('teacher')}:
        </Typography>
        {groupTeacher &&
        <ListItem button
                  onClick={() => history.push(USER_HOME_PAGE(groupTeacher.id))}>
          <ListItemAvatar>
            <Avatar alt='photo'
                    src='/empty-avatar.jpg'/>
          </ListItemAvatar>
          <ListItemText
            primary={getName(groupTeacher)}
            secondary={groupTeacher.scienceDegreeName}/>
        </ListItem>}

        {!groupTeacher &&
        <Typography variant='h6' gutterBottom>
          {i18n.t('group_does_not_have_teacher')}
        </Typography>}

        <Button style={{ color: textColor }}
                onClick={() => history.push(GROUP_SCHEDULE(group.value))}
                variant='outlined'
                size='medium'
                startIcon={<AssignmentIcon/>}>
          {i18n.t('group_schedule')}
        </Button>

      </Grid>
    </Paper>
  );
};
