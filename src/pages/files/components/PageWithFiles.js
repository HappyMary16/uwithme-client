import React from 'react';

import { SubjectFiles } from './SubjectFiles';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ADD_FILE, SHARE_FILES } from '../../../common/constants/links';
import { Copyright } from '../../../common/components/Copyright';
import i18n from '../../../locales/i18n';

const useStyles = makeStyles(theme => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  link: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: 'auto',
    backgroundColor: '#eeeeee',
    color: '#212121',
    border: `1px solid ${theme.palette.divider}`
  },
  buttons: {
    marginLeft: 'auto',
    marginRight: 0
  }
}));

export const PageWithFiles = ({ userRole, files }) => {
  const classes = useStyles();

  return (
    <Grid container xs={12} className={classes.root}>
      <Grid container xs={6} className={classes.buttons}>
        {//userRole === 'Teacher'
        true && (
          <Button href={ADD_FILE} variant="outlined" className={classes.link}>
            {i18n.t('add_files_page')}
          </Button>
        )}
        {//userRole === 'Teacher'
        true && (
          <Button
            href={SHARE_FILES}
            variant="outlined"
            className={classes.link}
          >
            {i18n.t('share_files_page')}
          </Button>
        )}
      </Grid>
      <List component="nav" className={classes.list}>
        {files &&
          files.map((fileInfo, i) => (
            <SubjectFiles
              key={i}
              name={fileInfo.subjectName}
              lectures={fileInfo.lectures}
              tasks={fileInfo.tasks}
            />
          ))}
      </List>

      <Grid xs={12}>
        <Copyright />
      </Grid>
    </Grid>
  );
};
