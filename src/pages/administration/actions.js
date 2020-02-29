export const ADD_UNIVERSITY = 'ADD_UNIVERSITY';

export const addUniversity = (university, username, password) => ({
  type: ADD_UNIVERSITY,
  university,
  username,
  password
});
