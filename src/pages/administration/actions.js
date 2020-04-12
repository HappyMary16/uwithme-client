export const ADD_UNIVERSITY = 'ADD_UNIVERSITY';
export const CREATE_INSTITUTE = 'CREATE_INSTITUTE';
export const INSTITUTE_CREATED = 'INSTITUTE_CREATED';

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

export const createInstitute = (
  universityId,
  instituteName
) => ({
  type: CREATE_INSTITUTE,
  payload: {
    universityId,
    instituteName
  }
});

export const instituteCreated = (universityId, instituteName) => ({
  type: INSTITUTE_CREATED,
  payload: {
    universityId,
    instituteName
  }
});