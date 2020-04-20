export const LOAD_TEACHERS_BY_UNIVERSITY_ID = 'LOAD_TEACHERS_BY_UNIVERSITY_ID';
export const LOAD_TEACHERS_BY_GROUP_ID = 'LOAD_TEACHERS_BY_GROUP_ID';
export const RENDER_TEACHERS = 'RENDER_TEACHERS';

export const RENDER_LESSONS_FOR_CURRENT_USER_PAGE = 'RENDER_LESSONS_FOR_CURRENT_USER_PAGE';
export const FIND_LESSONS_FOR_USER = 'FIND_LESSONS_FOR_USER';

export function loadTeachersByUniversityId(universityId) {
  return {
    type: LOAD_TEACHERS_BY_UNIVERSITY_ID,
    payload: {
      universityId
    }
  };
}

export function loadTeachersByGroupId(groupId) {
  return {
    type: LOAD_TEACHERS_BY_GROUP_ID,
    payload: {
      groupId
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

export const findLessonsForUser = (username) => ({
  type: FIND_LESSONS_FOR_USER,
  payload: {
    username
  }
});

export const renderLessonsForUser = (lessons) => ({
  type: RENDER_LESSONS_FOR_CURRENT_USER_PAGE,
  payload: {
    lessons
  }
});