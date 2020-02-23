export const GET_FILES_BY_SUBJECT = 'GET_ALL_FILES';
export const LOAD_FILES = 'LOAD_FILES';
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

export function loadSubjects(username) {
  return {
    type: LOAD_SUBJECTS,
    username
  };
}

export function getFilesBySubjectId(userName, subjectId) {
  return {
    type: GET_FILES_BY_SUBJECT,
    userName,
    subjectId
  };
}
