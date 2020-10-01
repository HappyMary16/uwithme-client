export const GET_ALL_FILES = 'GET_ALL_FILES';
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

export function loadSubjects() {
  return {
    type: LOAD_SUBJECTS
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

export function getFiles() {
  return {
    type: GET_ALL_FILES
  };
}
