export const LOAD_FILES = 'LOAD_FILES';

export const SAVE_SUBJECTS = 'SAVE_SUBJECTS';
export const LOAD_SUBJECTS = 'LOAD_SUBJECTS';
export const RENDER_SUBJECTS = 'RENDER_SUBJECTS';

export function loadSubjects(teacherUsername) {
  return {
    type: LOAD_SUBJECTS,
    teacherUsername
  };
}

export function saveSubject(teacherUsername, subjectName) {
  return {
    type: SAVE_SUBJECTS,
    teacherUsername,
    subjectName
  };
}
