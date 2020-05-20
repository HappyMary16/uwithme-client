import { LECTURE, TASK } from '../constants/userRoles';

export function getLectures(files) {
  if (files) {
    return files.filter(file => file.type === LECTURE);
  } else {
    return [];
  }
}

export function getTasks(files) {
  if (files) {
    return files.filter(file => file.type === TASK);
  } else {
    return [];
  }
}

export function getUploadProgressByFileName(uploadProgress, file) {
  const progress = uploadProgress && uploadProgress.filter(p => p.file === file)[0];
  return progress ? progress.progress : 0;
}