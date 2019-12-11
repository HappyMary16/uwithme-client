import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import './Dropzone.css';

const useStyles = makeStyles(theme => ({
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
  }
}));

export const Dropzone = ({ disabled, onFilesAddedFunk }) => {
  const classes = useStyles();

  let fileInputRef = React.createRef();
  const [highLight, setHighLight] = React.useState(false);

  let openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  let onFilesAdded = e => {
    if (disabled) return;
    const files = e.target.files;
    if (onFilesAddedFunk) {
      onFilesAddedFunk(files);
    }
  };

  let onDragOver = evt => {
    evt.preventDefault();

    if (disabled) return;

    setHighLight(true);
  };

  let onDragLeave = () => {
    setHighLight(false);
  };

  let onDrop = event => {
    event.preventDefault();

    if (disabled) return;

    const files = event.dataTransfer.files;
    if (onFilesAddedFunk) {
      onFilesAddedFunk(files);
    }
    setHighLight(false);
  };

  return (
    <div
      className={`Dropzone ${highLight ? 'Highlight' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <input
        ref={fileInputRef}
        className="FileInput"
        type="file"
        multiple
        onChange={onFilesAdded}
      />
      <CloudUploadIcon />
      <span>Upload Files</span>
    </div>
  );
};
