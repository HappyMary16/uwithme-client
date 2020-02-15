export const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
export const UPLOAD_PROGRESS = 'UPLOAD_PROGRESS';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';

export const GET_FILES_BY_SUBJECT = 'GET_ALL_FILES';

export const uploadRequest = (files, subjectName, fileType) => ({
  type: UPLOAD_REQUEST,
  files,
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

export const LOAD_FILES = 'LOAD_FILES';

export const SAVE_SUBJECTS = 'SAVE_SUBJECTS';
export const LOAD_SUBJECTS = 'LOAD_SUBJECTS';
export const RENDER_SUBJECTS = 'RENDER_SUBJECTS';
export const RENDER_FILES = 'RENDER_FILES';

export function loadFile(fileId, fileName, loading) {
  return {
    type: LOAD_FILES,
    fileId,
    fileName,
    loading
  };
}
export function loadSubjects(teacherUsername) {
  return {
    type: LOAD_SUBJECTS,
    teacherUsername
  };
}

export function getFilesBySubjectId(userName, subjectId) {
  return {
    type: GET_FILES_BY_SUBJECT,
    userName,
    subjectId
  };
}

export function saveSubject(teacherUsername, subjectName) {
  return {
    type: SAVE_SUBJECTS,
    teacherUsername,
    subjectName
  };
}
