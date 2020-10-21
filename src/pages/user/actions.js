export const LOAD_TEACHERS_BY_UNIVERSITY_ID = 'LOAD_TEACHERS_BY_UNIVERSITY_ID';
export const GET_STUDENTS_FRIENDS = 'GET_STUDENTS_FRIENDS';
export const GET_TEACHERS_FRIENDS = 'GET_TEACHERS_FRIENDS';

export const RENDER_USERS = 'RENDER_USERS';
export const RENDER_USER = 'RENDER_USER';

export const RENDER_LESSONS_FOR_CURRENT_USER_PAGE =
  'RENDER_LESSONS_FOR_CURRENT_USER_PAGE';
export const FIND_LESSONS_FOR_USER = 'FIND_LESSONS_FOR_USER';

export const UPLOAD_AVATAR = 'UPLOAD_AVATAR';
export const RENDER_AVATAR = 'RENDER_AVATAR';

export function loadTeachersByUniversityId() {
  return {
    type: LOAD_TEACHERS_BY_UNIVERSITY_ID
  };
}

export function loadTeachersByGroupId() {
  return {
    type: GET_STUDENTS_FRIENDS
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

export const findLessonsForUser = username => ({
  type: FIND_LESSONS_FOR_USER,
  payload: {
    username
  }
});

export const renderLessonsForUser = lessons => ({
  type: RENDER_LESSONS_FOR_CURRENT_USER_PAGE,
  payload: {
    lessons
  }
});

export function loadStudentsByTeacherId() {
  return {
    type: GET_TEACHERS_FRIENDS
  };
}

export const uploadAvatar = avatar => ({
  type: UPLOAD_AVATAR,
  payload: {
    avatar
  }
});

export const renderAvatar = (userId, avatar) => ({
  type: RENDER_AVATAR,
  payload: {
    userId,
    avatar
  }
});
