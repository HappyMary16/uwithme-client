export const GET_FILES_BY_USERNAME = 'GET_ALL_FILES';
export const DOWNLOAD_FILES = 'LOAD_FILES';
export const LOAD_SUBJECTS = 'LOAD_SUBJECTS';
export const LOAD_SUBJECTS_BY_UNIVERSITY_ID = 'LOAD_SUBJECTS_BY_UNIVERSITY_ID';
export const RENDER_SUBJECTS = 'RENDER_SUBJECTS';
export const RENDER_FILES = 'RENDER_FILES';

export const renderFiles = response => ({
  type: RENDER_FILES,
  response
});

export const renderSubjects = response => ({
  type: RENDER_SUBJECTS,
  payload: {
    subjects: response
  }
});

export function loadFile(fileId, fileName, loading) {
  return {
    type: DOWNLOAD_FILES,
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

export function loadSubjectsByUniversityId(universityId) {
  return {
    type: LOAD_SUBJECTS_BY_UNIVERSITY_ID,
    payload: {
      universityId
    }
  };
}

export function getFilesByUsername(userName) {
  return {
    type: GET_FILES_BY_USERNAME,
    userName
  };
}
