import React from 'react';
import { Dropzone } from './Dropzone';
import { FilesProgress } from './FilesProgress';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  upload: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
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
  }
}));

export const Upload = ({
                         addFiles,
                         uploadProgress,
                         uploading,
                         successfulUploaded,
                         files
                       }) => {
  const classes = useStyles();

  let onFilesAdded = filesToAdd => {
    let array = [].concat(files);

    for (let i = 0; i < filesToAdd.length; i++) {
      if (!array.includes(filesToAdd.item(i))) {
        array.push(filesToAdd.item(i));
      }
    }
    addFiles(array);
  };

  return (
    <Container>
      <div className={classes.upload}>
        <div className={classes.content}>
          <div>
            <Dropzone
              onFilesAddedFunk={onFilesAdded}
              disabled={uploading || successfulUploaded}
            />
          </div>
          <FilesProgress files={files} uploadProgress={uploadProgress} uploadStarted={uploading || successfulUploaded}/>
        </div>
      </div>
    </Container>
  );
};
