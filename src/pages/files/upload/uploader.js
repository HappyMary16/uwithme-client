import * as React from 'react';
import { connect } from 'react-redux';
import { uploadRequest } from './actions';

export const UploaderComponent = ({ progress, dispatch }) => {
  const upload = e => {
    dispatch(uploadRequest(e.target.files));
  };
  return (
    <span>
      <input type="file" onChange={upload} multiple required />
      <progress value={progress} />
    </span>
  );
};

const mapStateToProps = () => ({
  progress: 0
});

export const Uploader = connect(mapStateToProps)(UploaderComponent);
