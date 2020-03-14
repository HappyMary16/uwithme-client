export const ADD_TODO = 'ADD_TODO';
export const HANDLE_AUTHENTICATION_CALLBACK = 'HANDLE_AUTHENTICATION_CALLBACK';
export const LOAD_INSTITUTES = 'LOAD_INSTITUTES';
export const LOAD_INSTITUTES_BY_UNIVERSITY_ID =
  'LOAD_INSTITUTES_BY_UNIVERSITY_ID';
export const LOAD_DEPARTMENTS_BY_UNIVERSITY_ID =
  'LOAD_DEPARTMENTS_BY_UNIVERSITY_ID';
export const LOAD_GROUPS_BY_UNIVERSITY_ID = 'LOAD_GROUPS_BY_UNIVERSITY_ID';
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const LOAD_GROUPS = 'LOAD_GROUPS';
export const RENDER_INSTITUTES = 'RENDER_INSTITUTES';
export const RENDER_DEPARTMENTS = 'RENDER_DEPARTMENTS';
export const RENDER_GROUPS = 'RENDER_GROUPS';

export const START_FETCHING = 'START_FETCHING';
export const END_FETCHING = 'END_FETCHING';

export const startFetching = () => ({
  type: START_FETCHING
});

export const endFetching = () => ({
  type: END_FETCHING
});

export const addToDo = title => ({
  type: ADD_TODO,
  toDoItem: {
    _id: new Date().getTime().toString(),
    title
  }
});

export const handleAuthenticationCallback = () => ({
  type: HANDLE_AUTHENTICATION_CALLBACK
});

export const loadInstitutes = () => ({
  type: LOAD_INSTITUTES
});

export const loadInstitutesByUniversityId = (universityId) => ({
  type: LOAD_INSTITUTES_BY_UNIVERSITY_ID,
  payload: universityId
});

export const loadDepartmentsByUniversityId = (universityId) => ({
  type: LOAD_DEPARTMENTS_BY_UNIVERSITY_ID,
  payload: universityId
});

export const loadGroupsByUniversityId = (universityId) => ({
  type: LOAD_GROUPS_BY_UNIVERSITY_ID,
  payload: universityId
});

export const loadDepartments = () => ({
  type: LOAD_DEPARTMENTS
});

export const loadGroups = () => ({
  type: LOAD_GROUPS
});
