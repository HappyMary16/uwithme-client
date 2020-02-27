import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FILES, SCHEDULE, USER_HOME } from '../../../common/constants/links';
import i18n from '../../../locales/i18n';
import Nav from 'react-bootstrap/Nav';

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
    backgroundColor: '#eeeeee',
    // height: '100vh',
    overflow: 'auto'
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
    <Nav
      defaultActiveKey="/home"
      className="flex-column"
      className={classes.appBar}
    >
      <Nav.Item>
        <Nav.Link href={USER_HOME}>{i18n.t('home_page')}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href={FILES}>{i18n.t('page_with_files')}</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href={SCHEDULE}>{i18n.t('schedule')}</Nav.Link>
      </Nav.Item>
    </Nav>
    // <AppBar
    //   position="static"
    //   color="default"
    //   elevation={0}
    //   className={classes.appBar}
    // >
    //   <MenuList className={classes.toolbar}>
    //     <MenuItem
    //       component={Link}
    //       href={USER_HOME}
    //       className={classes.menuItem}
    //     >
    //       {i18n.t('home_page')}
    //     </MenuItem>
    //     <MenuItem component={Link} href={FILES} className={classes.menuItem}>
    //       {i18n.t('page_with_files')}
    //     </MenuItem>
    //     <MenuItem component={Link} href={SCHEDULE} className={classes.menuItem}>
    //       {i18n.t('schedule')}
    //     </MenuItem>
    //   </MenuList>
    // </AppBar>
  );
};
