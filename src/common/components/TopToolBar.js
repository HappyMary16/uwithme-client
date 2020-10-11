import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ADD_UNIVERSITY_PATH, SIGN_IN } from '../../constants/links';
import i18n from '../../locales/i18n';
import Button from 'react-bootstrap/Button';

const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: 0,
    position: 'relative',
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: '#eeeeee'
  },
  toolbarTitle: {
    flexGrow: 1,
    paddingLeft: 5
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

export const TopToolBar = ({ user, signOutFunc, openMenu }) => {
  const classes = useStyles();

  return (
    <AppBar color='default' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {user &&
        <img src={'/menu-icon.png'} width="20" height="20" onClick={openMenu()}/>
        }
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
            href='/sign-in'
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
