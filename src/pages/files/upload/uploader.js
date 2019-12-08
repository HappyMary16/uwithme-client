import * as React from 'react';
import { connect } from 'react-redux';
import { uploadRequest } from './actions';

export const UploaderComponent = ({ progress, dispatch }) => {
  const upload = e => {
    const [file] = e.target.files || e.dataTransfer.files;
    dispatch(uploadRequest(file));
  };
  return (
    <span>
      <input type="file" onChange={upload} />
      <progress value={progress} />
    </span>
  );
};

const mapStateToProps = () => ({
  progress: 0
});

export const Uploader = connect(mapStateToProps)(UploaderComponent);
