export const LOAD_TEACHERS_BY_UNIVERSITY_ID = 'LOAD_TEACHERS_BY_UNIVERSITY_ID';
export const LOAD_TEACHERS_BY_GROUP_ID = 'LOAD_TEACHERS_BY_GROUP_ID';

export const LOAD_STUDENTS_BY_TEACHER_ID = 'LOAD_STUDENTS_BY_TEACHER_ID';
export const LOAD_STUDENTS_BY_GROUP_ID = 'LOAD_STUDENTS_BY_GROUP_ID';
export const LOAD_STUDENTS_WITHOUT_GROUP_BY_UNIVERSITY_ID = 'LOAD_STUDENTS_BY_GROUP_ID';

export const RENDER_USERS = 'RENDER_USERS';
export const RENDER_USER = 'RENDER_USER';

export const RENDER_LESSONS_FOR_CURRENT_USER_PAGE = 'RENDER_LESSONS_FOR_CURRENT_USER_PAGE';
export const FIND_LESSONS_FOR_USER = 'FIND_LESSONS_FOR_USER';

export const FIND_GROUPS_FOR_TEACHER = 'FIND_GROUPS_FOR_TEACHER';
export const RENDER_GROUPS_FOR_TEACHER = 'RENDER_GROUPS_FOR_TEACHER';

export const REMOVE_STUDENT_FROM_GROUP = 'REMOVE_STUDENT_FROM_GROUP';
export const ADD_STUDENT_TO_GROUP = 'ADD_STUDENT_TO_GROUP';

export const UPLOAD_AVATAR = 'UPLOAD_AVATAR';
export const LOAD_AVATAR = 'LOAD_AVATAR';
export const RENDER_AVATAR = 'RENDER_AVATAR';
export const RENDER_MY_AVATAR = 'RENDER_MY_AVATAR';

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

export function renderUser(user) {
  return {
    type: RENDER_USER,
    payload: {
      user
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

export function loadStudentsWithoutGroupByUniversityId(universityId) {
  return {
    type: LOAD_STUDENTS_WITHOUT_GROUP_BY_UNIVERSITY_ID,
    payload: {
      universityId
    }
  };
}

export function removeStudentFromGroup(studentId) {
  return {
    type: REMOVE_STUDENT_FROM_GROUP,
    payload: {
      studentId
    }
  };
}

export function addStudentToGroup(studentIds, groupId) {
  return {
    type: ADD_STUDENT_TO_GROUP,
    payload: {
      studentIds,
      groupId
    }
  };
}

export const uploadAvatar = (userId, avatar) => ({
  type: UPLOAD_AVATAR,
  payload: {
    userId,
    avatar
  }
});

export const loadAvatar = (userId) => ({
  type: UPLOAD_AVATAR,
  payload: {
    userId
  }
});

export const renderAvatar = (userId, avatar) => ({
  type: RENDER_AVATAR,
  payload: {
    userId,
    avatar
  }
});

export const renderMyAvatar = (avatar) => ({
  type: RENDER_MY_AVATAR,
  payload: {
    avatar
  }
});