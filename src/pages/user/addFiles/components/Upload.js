import React from 'react';
import { DropZone } from './DropZone';
import { FilesProgress } from './FilesProgress';
import Container from '@material-ui/core/Container';
import '../../../../styles/fileUpload.css';

export const Upload = ({
  addFiles,
  uploadProgress,
  uploading,
  successfulUploaded,
  files
}) => {
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
      <div className={'upload'}>
        <div className={'content'}>
          <div>
            <DropZone
              onFilesAddedFunk={onFilesAdded}
              disabled={uploading || successfulUploaded}
            />
          </div>
          <FilesProgress
            files={files}
            uploadProgress={uploadProgress}
            uploadStarted={uploading || successfulUploaded}
          />
        </div>
      </div>
    </Container>
  );
};
