import { LECTURE, TASK } from '../common/constants/userRoles';

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
