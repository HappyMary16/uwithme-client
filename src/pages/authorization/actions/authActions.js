export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

export const SIGN_OUT = 'SIGN_OUT';

export function signUpRequest(username, password) {
  return {
    type: REGISTRATION_REQUEST,
    username,
    password
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
