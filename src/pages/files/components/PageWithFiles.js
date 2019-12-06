import React from 'react';

import { SubjectFiles } from './SubjectFiles';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { ADD_FILE } from '../../../constants/links';
import Link from '@material-ui/core/Link';

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
  }
}));

export const PageWithFiles = ({ userType, files }) => {
  const classes = useStyles();

  return (
    <Grid container xs={12} className={classes.root}>
      {//userType === 'Teacher'
      true && (
        <Button href={ADD_FILE} variant="outlined" className={classes.link}>
          add file
        </Button>
      )}
      <List component="nav" className={classes.list}>
        {files.map((fileInfo, i) => (
          <SubjectFiles
            key={i}
            name={fileInfo.subjectName}
            lectures={fileInfo.lectures}
            tasks={fileInfo.tasks}
          />
        ))}
      </List>
    </Grid>
  );
};
