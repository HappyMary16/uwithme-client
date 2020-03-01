export const ADD_UNIVERSITY = 'ADD_UNIVERSITY';

export const addUniversity = (
  universityName,
  username,
  password,
  confirmPassword
) => ({
  type: ADD_UNIVERSITY,
  payload: {
    universityName: universityName,
    username: username,
    password: password,
    confirmPassword: confirmPassword
  }
});
