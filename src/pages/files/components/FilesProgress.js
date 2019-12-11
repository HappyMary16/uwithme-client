import React from 'react';
import './Progress.css';
import { Progress } from './Progress';

export const FilesProgress = ({ files, uploadProgress }) => {
  return (
    <div className="Files">
      {files.map(file => (
        <div key={file.name} className="Row">
          <span className="Filename">{file.name}</span>
          <Progress
          // fileUploadProgress={uploadProgress[file.name]}
          />
        </div>
      ))}
    </div>
  );
};
