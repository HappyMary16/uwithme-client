import React from 'react';
import {Container, ProgressBar} from 'react-bootstrap';

export function FilesProgress({files, uploadProgress}) {
  return (
    <Container>
      {files.map((file, i) => {
        const now = uploadProgress[file.name];
        return (
          <div key={i} className={'margin-bottom'}>
            <p>{file.name}</p>
            {!!now && <ProgressBar now={now} label={`${now}%`}/>}
          </div>
        );
      })}
    </Container>
  );
}
