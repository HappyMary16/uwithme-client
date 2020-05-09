export const LOAD_TEACHERS_BY_UNIVERSITY_ID = 'LOAD_TEACHERS_BY_UNIVERSITY_ID';
export const LOAD_TEACHERS_BY_GROUP_ID = 'LOAD_TEACHERS_BY_GROUP_ID';
export const LOAD_STUDENTS_BY_TEACHER_ID = 'LOAD_STUDENTS_BY_TEACHER_ID';
export const LOAD_STUDENTS_BY_GROUP_ID = 'LOAD_STUDENTS_BY_GROUP_ID';
export const RENDER_USERS = 'RENDER_USERS';

export const RENDER_LESSONS_FOR_CURRENT_USER_PAGE = 'RENDER_LESSONS_FOR_CURRENT_USER_PAGE';
export const FIND_LESSONS_FOR_USER = 'FIND_LESSONS_FOR_USER';

export const FIND_GROUPS_FOR_TEACHER = 'FIND_GROUPS_FOR_TEACHER';
export const RENDER_GROUPS_FOR_TEACHER = 'RENDER_GROUPS_FOR_TEACHER';

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

export function renderUsers(users) {
  return {
    type: RENDER_USERS,
    payload: {
      users
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

export const renderGroupsForTeacher = (groups) => ({
  type: RENDER_GROUPS_FOR_TEACHER,
  payload: {
    groups
  }
});

export const findGroupsForTeacher = (teacherId) => ({
  type: FIND_GROUPS_FOR_TEACHER,
  payload: {
    teacherId
  }
});

export function loadStudentsByTeacherId(teacherId) {
  return {
    type: LOAD_STUDENTS_BY_TEACHER_ID,
    payload: {
      teacherId
    }
  };
}

export function loadStudentsByGroupId(groupId) {
  return {
    type: LOAD_STUDENTS_BY_GROUP_ID,
    payload: {
      groupId
    }
  };
}