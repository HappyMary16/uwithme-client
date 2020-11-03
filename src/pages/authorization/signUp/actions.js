export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export function signUpRequest(
  userRole,
  studentId,
  scienceDegree,
  institute,
  department,
  group,
  universityId
) {
  return {
    type: SIGN_UP_REQUEST,
    userRole,
    studentId,
    scienceDegree,
    institute,
    department,
    group,
    universityId
  };
}
