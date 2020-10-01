export const GET_ALL_FILES = 'GET_ALL_FILES';
export const DOWNLOAD_FILES = 'LOAD_FILES';
export const LOAD_SUBJECTS = 'LOAD_SUBJECTS';
export const LOAD_SUBJECTS_BY_WITHOUT_FILES = 'LOAD_SUBJECTS_BY_WITHOUT_FILES';
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

export function loadSubjectsWithoutFiles() {
  return {
    type: LOAD_SUBJECTS_BY_WITHOUT_FILES
  };
}

export const getFiles = () => ({
  type: GET_ALL_FILES
});
