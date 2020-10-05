import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ADD_UNIVERSITY_PATH, SIGN_IN } from '../../constants/links';
import i18n from '../../locales/i18n';
import Button from 'react-bootstrap/Button';
import { List } from 'react-bootstrap-icons';
import useScreenSize, { BreakPoint } from 'use-screen-size';

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
  const size = useScreenSize();
  const isSmall = size.screen === BreakPoint.xs || size.screen === BreakPoint.s;

  return (
    <AppBar position='relative' color='default' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {isSmall && <List/>}
        <Typography
          variant='h6'
          color='inherit'
          noWrap
          className={classes.toolbarTitle}
        >
          {i18n.t('ntu_khpi')}
        </Typography>
        {!user && (
          <Button
            href={ADD_UNIVERSITY_PATH}
            variant={'purple'}
            className={classes.link}
          >
            {i18n.t('add_university')}
          </Button>
        )}
        {!user && (
          <Button
            href={SIGN_IN}
            variant={'purple'}
            className={classes.link}
          >
            {i18n.t('sign_in')}
          </Button>
        )}
        {user && (
          <Button
            href='/university'
            variant={'purple'}
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
