export const LOAD_TEACHERS_BY_UNIVERSITY_ID = 'LOAD_TEACHERS_BY_UNIVERSITY_ID';
export const RENDER_TEACHERS = 'RENDER_TEACHERS';

export function loadTeachersByUniversityId(universityId) {
  return {
    type: LOAD_TEACHERS_BY_UNIVERSITY_ID,
    payload: {
      universityId
    }
  };
}

export function renderTeachers(teachers) {
  return {
    type: RENDER_TEACHERS,
    payload: {
      teachers
    }
  };
}