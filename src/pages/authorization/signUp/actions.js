export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

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
