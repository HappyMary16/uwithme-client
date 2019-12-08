export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export const uploadRequest = file => ({
  type: UPLOAD_REQUEST,
  file
});
export const uploadProgress = (file, progress) => ({
  type: UPLOAD_PROGRESS,
  progress: progress + 1,
  file
});
export const uploadSuccess = file => ({
  type: UPLOAD_SUCCESS,
  file
});
export const uploadFailure = (file, err) => ({
  type: UPLOAD_FAILURE,
  err,
  error: true,
  file
});
