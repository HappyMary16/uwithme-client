import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ADD_UNIVERSITY_PATH, SIGN_IN } from '../../constants/links';
import i18n from '../../locales/i18n';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#eeeeee'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}));

export const TopToolBar = ({ user, signOutFunc }) => {
  const classes = useStyles();

  return (
    <AppBar position="relative" color="default" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {/*<IconButton*/}
        {/*  color="inherit"*/}
        {/*  aria-label="open drawer"*/}
        {/*  edge="start"*/}
        {/*  onClick={handleDrawerToggle}*/}
        {/*  className={classes.menuButton}*/}
        {/*>*/}
        {/*  <MenuIcon />*/}
        {/*</IconButton>*/}
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          {i18n.t('university_name')}
        </Typography>
        {!user && (
          <Button
            href={ADD_UNIVERSITY_PATH}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            {i18n.t('add_university')}
          </Button>
        )}
        {!user && (
          <Button
            href={SIGN_IN}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            {i18n.t('sign_in')}
          </Button>
        )}
        {user && (
          <Button
            href="/university"
            color="primary"
            variant="outlined"
            className={classes.link}
            onClick={signOutFunc()}
          >
            {i18n.t('sign_out')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
