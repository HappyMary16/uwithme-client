export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const KEYCLOAK_SIGN_IN_SUCCESS = 'KEYCLOAK_SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';

export const DOWNLOAD_MY_AVATAR = 'DOWNLOAD_MY_AVATAR';
export const RENDER_MY_AVATAR = 'RENDER_MY_AVATAR';

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
