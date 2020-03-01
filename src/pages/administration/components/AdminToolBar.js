import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { USER_HOME } from '../../../common/constants/links';
import i18n from '../../../locales/i18n';
import AppBar from '@material-ui/core/AppBar';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';

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

export const AdminToolBar = () => {
  const classes = useStyles();

  //TODO add menu items

  return (
    <AppBar
      position="static"
      color="white"
      elevation={0}
      className={classes.appBar}
    >
      <MenuList className={classes.toolbar}>
        <MenuItem
          component={Link}
          href={USER_HOME}
          className={classes.menuItem}
        >
          {i18n.t('home_page')}
        </MenuItem>
        {/*<MenuItem component={Link}*/}
        {/*          href={FILES}*/}
        {/*          className={classes.menuItem}>*/}
        {/*  {i18n.t('page_with_files')}*/}
        {/*</MenuItem>*/}
        {/*<MenuItem component={Link}*/}
        {/*          href={SCHEDULE}*/}
        {/*          className={classes.menuItem}>*/}
        {/*  {i18n.t('schedule')}*/}
        {/*</MenuItem>*/}
      </MenuList>
    </AppBar>
  );
};
