export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const CLEAR_UPLOAD_PROGRESS = 'CLEAR_UPLOAD_PROGRESS';
export const CLEAR_UPLOAD_SUCCESS = 'CLEAR_UPLOAD_SUCCESS';

export const uploadRequest = (files, username, subjectName, fileType) => ({
  type: UPLOAD_REQUEST,
  files,
  username,
  subjectName,
  fileType
});

export const uploadProgress = (file, progress) => ({
  type: UPLOAD_PROGRESS,
  payload: {
    progress,
    file
  }
});

export const uploadSuccess = files => ({
  type: UPLOAD_SUCCESS,
  payload: {
    files
  }
});

export const uploadFailure = (file, err) => ({
  type: UPLOAD_FAILURE,
  err,
  error: true,
  file
});

export const clearUploadSuccess = () => ({
  type: CLEAR_UPLOAD_SUCCESS
});

export const clearUploadProgress = () => ({
  type: CLEAR_UPLOAD_PROGRESS
});