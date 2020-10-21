import React from 'react';
import i18n from '../../../../locales/i18n';
import '../../../../styles/fileUpload.css';
import { CloudArrowUpFill } from 'react-bootstrap-icons';

export const DropZone = ({ disabled, onFilesAddedFunk }) => {
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
      className={
        'dropZone & ' + (highLight ? 'highLightDragOver' : 'highLight')
      }
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <input
        ref={fileInputRef}
        className={'fileInput'}
        type="file"
        multiple
        onChange={onFilesAdded}
      />
      <CloudArrowUpFill size={30} class={'icon-color'} />
      <span>{i18n.t('upload_files')}</span>
    </div>
  );
};
