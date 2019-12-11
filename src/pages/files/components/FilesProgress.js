import React from 'react';
import './Progress.css';
import { Progress } from './Progress';
import Grid from '@material-ui/core/Grid';

export const FilesProgress = ({ files, uploadProgress }) => {
  return (
    <Grid xs={12} className="Files">
      {files.map(file => (
        <Grid item xs={12} key={file.name} className="Row">
          <span className="Filename">{file.name}</span>
          <Progress
          // fileUploadProgress={uploadProgress[file.name]}
          />
        </Grid>
      ))}
    </Grid>
  );
};
