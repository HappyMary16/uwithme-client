export const SAVE_SUBJECTS = 'SAVE_SUBJECTS';

export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export function saveSubject(username, subjectName) {
  return {
    type: SAVE_SUBJECTS,
    username,
    subjectName
  };
}

export const uploadRequest = (files, username, subjectName, fileType) => ({
  type: UPLOAD_REQUEST,
  files,
  username,
  subjectName,
  fileType
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