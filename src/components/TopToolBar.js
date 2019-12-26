import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { SIGN_IN } from '../constants/links';
import i18n from '../locales/i18n';

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
    backgroundColor: '#eeeeee'
  },
  toolbar: {
    flexWrap: 'wrap'
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

export const TopToolBar = ({ user, signOutFunc }) => {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.toolbarTitle}
        >
          {i18n.t('university_name')}
        </Typography>
        <nav>
          {/*<Link*/}
          {/*  variant="button"*/}
          {/*  color="textPrimary"*/}
          {/*  href="#"*/}
          {/*  className={classes.link}*/}
          {/*>*/}
          {/*  Features*/}
          {/*</Link>*/}
          {/*<Link*/}
          {/*  variant="button"*/}
          {/*  color="textPrimary"*/}
          {/*  href="#"*/}
          {/*  className={classes.link}*/}
          {/*>*/}
          {/*  Enterprise*/}
          {/*</Link>*/}
          {/*<Link*/}
          {/*  variant="button"*/}
          {/*  color="textPrimary"*/}
          {/*  href="#"*/}
          {/*  className={classes.link}*/}
          {/*>*/}
          {/*  Support*/}
          {/*</Link>*/}
        </nav>
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
