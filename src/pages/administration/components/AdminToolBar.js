import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { USER_HOME } from '../../../common/constants/links';
import i18n from '../../../locales/i18n';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';

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
      color="inherit"
      elevation={0}
      className={classes.appBar}
    >
      <List className={classes.toolbar}>
        <ListItem
          component={Link}
          href={USER_HOME}
          className={classes.menuItem}
        >
          {i18n.t('university_structure')}
        </ListItem>
      </List>
    </AppBar>
  );
};
