import {CloudArrowUpFill} from 'react-bootstrap-icons';
import {createRef, useState} from "react";
import {useTranslation} from "react-i18next";

export default function DropZone({ disabled, onFilesAddedFunk }) {

  const {t} = useTranslation("file");

  let fileInputRef = createRef();
  const [highLight, setHighLight] = useState(false);

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
        'drop-zone & ' + (highLight ? 'high-light-drag-over' : 'high-light')
      }
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={openFileDialog}
      style={{ cursor: disabled ? 'default' : 'pointer' }}
    >
      <input
        ref={fileInputRef}
        className={'file-input'}
        type="file"
        multiple
        onChange={onFilesAdded}
      />
      <CloudArrowUpFill size={30} className={'icon-color'} />
      <span>{t('upload_files')}</span>
    </div>
  );
}
