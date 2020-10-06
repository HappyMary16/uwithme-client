import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ADD_LESSON, LECTURE_HALLS, SCHEDULE, USER_HOME } from '../../../constants/links';
import i18n from '../../../locales/i18n';
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

export const AdminToolBar = ({ isOpen = false }) => {
  const classes = useStyles();

  return (
    <Menu isOpen={isOpen}>
      <a
        href={USER_HOME}
        className={classes.menuItem}>
        {i18n.t('university_structure')}
      </a>

      <a
        href={LECTURE_HALLS}
        className={classes.menuItem}>
        {i18n.t('lecture_halls')}
      </a>

      <a
        href={ADD_LESSON}
        className={classes.menuItem}>
        {i18n.t('add_lesson')}
      </a>

      <a href={SCHEDULE}
         className={classes.menuItem}>
        {i18n.t('schedule')}
      </a>
    </Menu>
  );
};
