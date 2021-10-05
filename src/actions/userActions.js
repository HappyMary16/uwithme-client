export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const UPDATE_ACTIVE_ROLE = 'UPDATE_ACTIVE_ROLE';

export const GET_TEACHERS = 'GET_TEACHERS';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_ADMINS = 'GET_ADMINS';
export const GET_USERS_BY_PARAMS = 'GET_USERS_BY_PARAMS';

export const RENDER_USERS = 'RENDER_USERS';
export const RENDER_USER = 'RENDER_USER';

export const UPLOAD_AVATAR = 'UPLOAD_AVATAR';
export const RENDER_AVATAR = 'RENDER_AVATAR';

export const DOWNLOAD_MY_AVATAR = 'DOWNLOAD_MY_AVATAR';
export const RENDER_MY_AVATAR = 'RENDER_MY_AVATAR';

export const LOAD_STUDENTS_BY_GROUP_ID = 'LOAD_STUDENTS_BY_GROUP_ID';
export const LOAD_STUDENTS_WITHOUT_GROUP = 'LOAD_STUDENTS_WITHOUT_GROUP';
export const REMOVE_STUDENT_FROM_GROUP = 'REMOVE_STUDENT_FROM_GROUP';
export const ADD_STUDENT_TO_GROUP = 'ADD_STUDENT_TO_GROUP';

export const UN_ASSIGN_ROLE = 'UN_ASSIGN_ROLE';

export function updateActiveRole(role) {
  return {
    type: UPDATE_ACTIVE_ROLE,
    payload: {
      role
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

export function loadStudentsWithoutGroup() {
  return {
    type: LOAD_STUDENTS_WITHOUT_GROUP
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

export function loadTeachers() {
  return {
    type: GET_TEACHERS
  };
}

export function loadAdmins() {
  return {
    type: GET_ADMINS
  };
}

export function unAssignRole(userId, role) {
  return {
    type: UN_ASSIGN_ROLE,
    payload: {
      userId,
      role
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

export function loadUsersByRole(role) {
  return {
    type: GET_USERS_BY_PARAMS,
    payload: {
      role
    }
  };
}

export function loadStudents() {
  return {
    type: GET_STUDENTS
  };
}

export const updateUser = (university, institute, department, group) => ({
  type: UPDATE_USER,
  payload: {
    university,
    institute,
    department,
    group
  }
});

export const deleteUser = () => ({
  type: DELETE_USER
});

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

export const downloadMyAvatar = () => ({
  type: DOWNLOAD_MY_AVATAR
});

export const renderMyAvatar = avatar => ({
  type: RENDER_MY_AVATAR,
  payload: {
    avatar
  }
});
