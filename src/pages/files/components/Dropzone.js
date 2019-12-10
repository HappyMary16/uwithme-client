import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
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
  const [hightLight, setHightLight] = React.useState(false);
  let fileListToArray = list => {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  let openFileDialog = () => {
    if (disabled) return;
    fileInputRef.current.click();
  };

  let onFilesAdded = e => {
    if (this.props.disabled) return;
    const files = e.target.files;
    if (onFilesAddedFunk) {
      const array = fileListToArray(files);
      onFilesAddedFunk(array);
    }
  };

  let onDragOver = evt => {
    evt.preventDefault();

    if (disabled) return;

    setHightLight(true);
  };

  let onDragLeave = () => {
    setHightLight(false);
  };

  let onDrop = event => {
    event.preventDefault();

    if (disabled) return;

    const files = event.dataTransfer.files;
    if (onFilesAddedFunk) {
      const array = fileListToArray(files);
      onFilesAddedFunk(array);
    }
    setHightLight(false);
  };

  return (
    <div
      className={`Dropzone ${hightLight ? 'Highlight' : ''}`}
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
      <img alt="upload" className="Icon" src="baseline-cloud_upload-24px.svg" />
      <span>Upload Files</span>
    </div>
  );
};
