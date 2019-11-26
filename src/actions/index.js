export const ADD_TODO = 'ADD_TODO';
export const LOAD_TODO_LIST = 'LOAD_TODO_LIST';
export const RENDER_TODO_LIST = 'RENDER_TODO_LIST';

export const USER_PROFILE_LOADED = 'USER_PROFILE_LOADED';
export const HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK';

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT';

export function registrationRequest(username, password) {
  return {
    type: REGISTRATION_REQUEST,
    username,
    password
  };
}

export function loginRequest(username, password) {
  return {
    type: LOGIN_REQUEST,
    username,
    password
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function addToDo(title) {
  return {
    type: ADD_TODO,
    toDoItem: {
      _id: new Date().getTime().toString(),
      title
    }
  };
}

export function addUser(token, user) {
  return {
    type: LOGIN_SUCCESS,
    token,
    user: {
      _id,
      firstName,
      lastName,
      username,
      phone,
      email,
      _role
    }
  };
}

export function loadToDoList() {
  return {
    type: LOAD_TODO_LIST
  };
}

export function handleAuthenticationCallback() {
  return {
    type: HANDLE_AUTHENTICATION_CALLBACK
  };
}
