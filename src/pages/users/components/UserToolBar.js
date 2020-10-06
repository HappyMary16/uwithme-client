import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FILES, SCHEDULE, STUDENTS, TEACHERS, USER_HOME } from '../../../constants/links';
import i18n from '../../../locales/i18n';
import AppBar from '@material-ui/core/AppBar';
import { isStudent, isTeacher } from '../../../utils/UsersUtil';
import { slide as Menu } from 'react-burger-menu';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0
    },
    li: {
      listStyle: 'none'
    }
  },
  appBar: {
    margin: 0,
    padding: 0,
    height: '100%',
    overflow: 'auto'
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  menuItem: {
    color: '#212121',
    marginTop: theme.spacing(1),
    borderBottom: `2px solid ${theme.palette.divider}`
  }
}));

export const UserToolBar = ({ user, isOpen }) => {
  const classes = useStyles();

  const drawer = (
    <Menu isOpen={isOpen}>
      <a href={USER_HOME} className={classes.menuItem}>
        {i18n.t('home_page')}
      </a>
      <a href={SCHEDULE} className={classes.menuItem}>
        {i18n.t('schedule')}
      </a>
      <a href={FILES} className={classes.menuItem}>
        {i18n.t('page_with_files')}
      </a>
      {isStudent(user) &&
      (<a href={TEACHERS} className={classes.menuItem}>
        {i18n.t('teachers')}
      </a>)
      }
      {isTeacher(user) &&
      (<a href={STUDENTS} className={classes.menuItem}>
        {i18n.t('students')}
      </a>)
      }
    </Menu>
  );

  return (
    <AppBar
      position='static'
      color='inherit'
      elevation={0}
      className={classes.appBar}
    >
      {drawer}
    </AppBar>
  );
};
