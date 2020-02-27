export const ADD_TODO = 'ADD_TODO';
export const HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK';
export const LOAD_INSTITUTES = 'LOAD_INSTITUTES';
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const LOAD_GROUPS = 'LOAD_GROUPS';
export const RENDER_INSTITUTES = 'RENDER_INSTITUTES';
export const RENDER_DEPARTMENTS = 'RENDER_DEPARTMENTS';
export const RENDER_GROUPS = 'RENDER_GROUPS';

export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

export function addToDo(title) {
  return {
    type: ADD_TODO,
    toDoItem: {
      _id: new Date().getTime().toString(),
      title
    }
  };
}

export function handleAuthenticationCallback() {
  return {
    type: HANDLE_AUTHENTICATION_CALLBACK
  };
}

export function loadInstitutes() {
  return {
    type: LOAD_INSTITUTES
  };
}

export function loadDepartments() {
  return {
    type: LOAD_DEPARTMENTS
  };
}

export function loadGroups() {
  return {
    type: LOAD_GROUPS
  };
}
