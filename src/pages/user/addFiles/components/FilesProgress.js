import React from 'react';
import { Progress } from './Progress';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import { getUploadProgressByFileName } from '../../../../utils/FileUtil';

const useStyles = makeStyles(theme => ({
  row: {
    height: 'auto'
  },
  fileName: {
    marginBottom: '8px',
    fontSize: '16px',
    color: '#555'
  },
  files: {
    marginLeft: theme.spacing(2)
  }
}));

export const FilesProgress = ({ files, uploadProgress, uploadStarted }) => {
  const classes = useStyles();

  return (
    <Grid xs={12} className={classes.files}>
      {files.map(file => (
        <Grid item xs={12} key={file.name} className={classes.row}>
          <span className={classes.fileName}>{file.name}</span>
          {uploadStarted && (
            <Progress
              progress={getUploadProgressByFileName(uploadProgress, file.name)}
            />
          )}
        </Grid>
      ))}
    </Grid>
  );
};
