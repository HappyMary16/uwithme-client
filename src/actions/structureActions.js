export const LOAD_USER_UNIVERSITY_INFO = 'LOAD_USER_UNIVERSITY_INFO';

export const loadUserUniversityInfo = (universityId, instituteId, departmentId) => ({
  type: LOAD_USER_UNIVERSITY_INFO,
  payload: {
    universityId,
    instituteId,
    departmentId
  }
});