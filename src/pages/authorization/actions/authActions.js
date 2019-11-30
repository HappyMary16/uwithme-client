export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

export const SIGN_OUT = 'SIGN_OUT';

export function signUpRequest(
  username,
  password,
  userType,
  institute,
  department,
  group
) {
  return {
    type: SIGN_UP_REQUEST,
    username,
    password,
    userType,
    institute,
    department,
    group
  };
}

export function signInRequest(username, password) {
  return {
    type: SIGN_IN_REQUEST,
    username,
    password
  };
}

export function signOut() {
  return {
    type: SIGN_OUT
  };
}

export function addUser(token) {
  return {
    type: SIGN_IN_SUCCESS,
    token
  };
}
