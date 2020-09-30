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

export function isPossibleToOpen(fileName) {
  const partOfFileName = fileName.split('.');
  const format = partOfFileName[partOfFileName.length - 1];
  return format === 'pdf' || format === 'jpg';
}

export function arrayBufferToDataUrl(buffer) {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  if (window.btoa(binary)) {
    return 'data:image/png;base64,' + window.btoa(binary);
  } else {
    return null;
  }
}