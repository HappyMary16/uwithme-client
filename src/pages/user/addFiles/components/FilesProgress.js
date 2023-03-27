import React from 'react';
import { getUploadProgressByFileName } from '../../../../utils/FileUtil';
import { Container, ProgressBar } from 'react-bootstrap';

export function FilesProgress({ files, uploadProgress }) {
  return (
    <Container>
      {files.map(file => {
        const now = getUploadProgressByFileName(uploadProgress, file.name);
        return (
          <div className={'margin-bottom'}>
            <p>{file.name}</p>
            {!!now && <ProgressBar now={now} label={`${now}%`} />}
          </div>
        );
      })}
    </Container>
  );
}
