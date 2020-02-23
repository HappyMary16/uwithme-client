import React from 'react';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  progressBar: {
    width: '100%',
    height: '8px',
    backgroundColor: 'rgb(183, 155, 229)',
    borderRadius: '5px'
  },
  progress: {
    backgroundColor: 'rgba(103, 58, 183, 1)',
    height: '100%',
    margin: '0',
    borderRadius: '5px'
  }
}));

export const Progress = ({ fileUploadProgress }) => {
  const classes = useStyles();
  //TODO fix it
  let progress = fileUploadProgress
    ? fileUploadProgress.percentage
    : Math.random() * 5 + 96;

  return (
    <Grid container xs={12} alignItems={'center'}>
      <Grid item xs={10} className={classes.progressBar}>
        <div className={classes.progress} style={{ width: progress + '%' }} />
      </Grid>
      {progress >= 100 && <CheckCircleOutlineIcon fontSize={'small'} />}
    </Grid>
  );
};
