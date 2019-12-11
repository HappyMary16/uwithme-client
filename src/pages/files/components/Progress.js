import React from 'react';
import './Progress.css';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Grid from '@material-ui/core/Grid';

export const Progress = ({ fileUploadProgress }) => {
  let progress = fileUploadProgress ? fileUploadProgress.percentage : 100;
  return (
    <Grid container={} className="ProgressBar">
      <div className="Progress" style={{ width: progress + '%' }} />
      {progress === 100 && <CheckCircleOutlineIcon />}
    </Grid>
  );
};
