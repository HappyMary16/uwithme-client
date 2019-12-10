import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Dropzone } from './Dropzone';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(8)
  },
  card: {
    backgroundColor: 'white',
    padding: '32px',
    width: '50%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    boxShadow:
      '0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08)',
    boxSizing: 'border-box'
  },
  upload: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    textAlign: 'left',
    overflow: 'hidden'
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '16px',
    boxSizing: 'border-box',
    width: '100%'
  },

  files: {
    marginLeft: '32px',
    alignItems: 'flex-start',
    justifyItems: 'flex-start',
    flex: 1,
    overflowY: 'auto'
  },

  actions: {
    display: 'flex',
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'column',
    marginTop: '32px'
  },

  title: {
    marginBottom: '32px',
    color: '#555'
  }
}));

export const UploadFiles = ({
  uploading,
  uploadProgress,
  successfulUploaded
}) => {
  const classes = useStyles();

  let files = [];
  let onFilesAdded = files => {
    files = files.concat(files);
  };

  return (
    <Card className={classes.card}>
      <div className={classes.upload}>
        <span className={classes.title}>Upload Files</span>
        <div className={classes.content}>
          <div>
            <Dropzone
              onFilesAdded={onFilesAdded}
              disabled={uploading || successfulUploaded}
            />
          </div>
          <div className={classes.files}>
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.actions}>{this.renderActions()}</div>
      </div>
    </Card>
  );
};
