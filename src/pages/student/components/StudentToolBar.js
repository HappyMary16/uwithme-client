import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import { FILES, SCHEDULE, USER_HOME } from '../../../constants/links';
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
    borderBottom: `1px solid ${theme.palette.divider}`,
    height: '100%',
    backgroundColor: '#eeeeee'
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  menuItem: {
    color: '#212121',
    marginTop: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

export const StudentToolBar = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <MenuList className={classes.toolbar}>
        <MenuItem
          component={Link}
          href={USER_HOME}
          className={classes.menuItem}
        >
          Home
        </MenuItem>
        <MenuItem component={Link} href={FILES} className={classes.menuItem}>
          Files
        </MenuItem>
        <MenuItem component={Link} href={SCHEDULE} className={classes.menuItem}>
          Schedule
        </MenuItem>
      </MenuList>
    </AppBar>
  );
};
