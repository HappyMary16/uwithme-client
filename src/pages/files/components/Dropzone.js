import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import i18n from '../../../locales/i18n';

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
  },
  fileInput: {
    display: 'none'
  },
  highLight: {
    backgroundColor: 'rgb(188, 185, 236)'
  },
  dropZone: {
    height: '200px',
    width: '200px',
    backgroundColor: '#fff',
    border: '2px dashed rgb(187, 186, 186)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '16px'
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
      className={highLight ? classes.highLight : classes.dropZone}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <input
        ref={fileInputRef}
        className={classes.fileInput}
        type="file"
        multiple
        onChange={onFilesAdded}
      />
      <CloudUploadIcon />
      <span>{i18n.t('upload_files')}</span>
    </div>
  );
};
