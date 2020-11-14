export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const KEYCLOAK_SIGN_IN_SUCCESS = 'KEYCLOAK_SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';

export const DOWNLOAD_MY_AVATAR = 'DOWNLOAD_MY_AVATAR';
export const RENDER_MY_AVATAR = 'RENDER_MY_AVATAR';

export const LOAD_UNIVERSITIES = 'LOAD_UNIVERSITIES';
export const LOAD_INSTITUTES = 'LOAD_INSTITUTES';
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const LOAD_GROUPS = 'LOAD_GROUPS';

export const RENDER_UNIVERSITIES_FOR_REGISTRATION =
  'RENDER_UNIVERSITIES_FOR_REGISTRATION';
export const RENDER_INSTITUTES_FOR_REGISTRATION =
  'RENDER_INSTITUTES_FOR_REGISTRATION';
export const RENDER_DEPARTMENTS_FOR_REGISTRATION =
  'RENDER_DEPARTMENTS_FOR_REGISTRATION';
export const RENDER_GROUPS_FOR_REGISTRATION = 'RENDER_GROUPS_FOR_REGISTRATION';

export function signUpRequest(
  role,
  instituteId,
  departmentId,
  groupId,
  universityId,
  universityName
) {
  return {
    type: SIGN_UP_REQUEST,
    payload: {
      role,
      instituteId,
      departmentId,
      groupId,
      universityId,
      universityName
    }
  };
}

export const signInRequest = () => ({
  type: SIGN_IN_REQUEST
});

export const signOut = () => ({
  type: SIGN_OUT
});

export const signInSuccess = user => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    user
  }
});

export const signInError = () => ({
  type: SIGN_IN_ERROR
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

export const keycloakSignInSuccess = () => ({
  type: KEYCLOAK_SIGN_IN_SUCCESS
});

export const loadUniversities = () => ({
  type: LOAD_UNIVERSITIES
});

export const loadInstitutes = universityId => ({
  type: LOAD_INSTITUTES,
  payload: {
    universityId
  }
});

export const loadDepartments = instituteId => ({
  type: LOAD_DEPARTMENTS,
  payload: {
    instituteId
  }
});

export const loadGroups = departmentId => ({
  type: LOAD_GROUPS,
  payload: {
    departmentId
  }
});

export const renderUniversitiesForRegistration = universities => ({
  type: RENDER_UNIVERSITIES_FOR_REGISTRATION,
  payload: {
    universities
  }
});

export const renderInstitutesForRegistration = institutes => ({
  type: RENDER_INSTITUTES_FOR_REGISTRATION,
  payload: {
    institutes
  }
});

export const renderDepartmentForRegistration = departments => ({
  type: RENDER_DEPARTMENTS_FOR_REGISTRATION,
  payload: {
    departments
  }
});

export const renderGroupsForRegistration = groups => ({
  type: RENDER_GROUPS_FOR_REGISTRATION,
  payload: {
    groups
  }
});
