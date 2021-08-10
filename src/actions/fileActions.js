export const UPLOAD_REQUEST = "UPLOAD_REQUEST";
export const UPLOAD_PROGRESS = "UPLOAD_PROGRESS";
export const UPLOAD_SUCCESS = "UPLOAD_SUCCESS";
export const CLEAR_UPLOAD_PROGRESS = "CLEAR_UPLOAD_PROGRESS";
export const CLEAR_UPLOAD_SUCCESS = "CLEAR_UPLOAD_SUCCESS";

export const DOWNLOAD_FILES = "LOAD_FILES";
export const RENDER_FILES = "RENDER_FILES";

export const LOAD_SUBJECTS_AND_FILES = "LOAD_SUBJECTS_WITH_FILES";
export const LOAD_SUBJECTS = "LOAD_SUBJECTS";
export const RENDER_SUBJECTS = "RENDER_SUBJECTS";

export const ADD_ACCESS_TO_FILES = "ADD_ACCESS_TO_FILES";

export function addAccessToFiles(fileIds, groupIds) {
  return {
    type: ADD_ACCESS_TO_FILES,
    fileIds,
    groupIds
  };
}

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

export function loadSubjectsAndFiles() {
  return {
    type: LOAD_SUBJECTS_AND_FILES
  };
}

export function loadSubjects() {
  return {
    type: LOAD_SUBJECTS
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

export const clearUploadSuccess = () => ({
  type: CLEAR_UPLOAD_SUCCESS
});

export const clearUploadProgress = () => ({
  type: CLEAR_UPLOAD_PROGRESS
});
