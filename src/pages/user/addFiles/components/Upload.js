import React from 'react';
import { DropZone } from './DropZone';
import { FilesProgress } from './FilesProgress';
import '../../../../styles/fileUpload.css';
import i18n from '../../../../locales/i18n';
import { Container, Row } from 'react-bootstrap';

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
    <div className={'upload'}>
      <div className={'content'}>
        <div>
          <DropZone
            onFilesAddedFunk={onFilesAdded}
            disabled={uploading || successfulUploaded}
          />
        </div>
        {(!files || files.length === 0) && (
          <Container>
            <Row className={'justify-content-center'}>
              <h5 className={'text'}>{i18n.t('choose_files')}</h5>
            </Row>
          </Container>
        )}
        {files && files.length > 0 && (
          <FilesProgress files={files} uploadProgress={uploadProgress} />
        )}
      </div>
    </div>
  );
};
