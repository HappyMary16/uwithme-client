import React, { useEffect } from 'react';
import './Upload.css';
import { Dropzone } from './Dropzone';
import { FilesProgress } from './FilesProgress';
import Container from '@material-ui/core/Container';

export const Upload = ({
  addFiles,
  uploadProgress,
  uploading,
  successfulUploaded
}) => {
  let [files, setFiles] = React.useState([]);

  let onFilesAdded = filesToAdd => {
    const array = [];

    for (let i = 0; i < filesToAdd.length; i++) {
      array.push(filesToAdd.item(i));
    }

    setFiles(files.concat(array));
    addFiles(files);
  };

  return (
    <Container>
      <div className="Upload">
        <div className="Content">
          <div>
            <Dropzone
              onFilesAddedFunk={onFilesAdded}
              disabled={uploading || successfulUploaded}
            />
          </div>
          <FilesProgress files={files} uploadProgress={uploadProgress} />
        </div>
      </div>
    </Container>
  );
};
