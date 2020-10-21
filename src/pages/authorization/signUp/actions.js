export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';

export function signUpRequest(
  firstName,
  lastName,
  surname,
  username,
  password,
  confirmPassword,
  phone,
  email,
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
    firstName,
    lastName,
    surname,
    username,
    password,
    confirmPassword,
    phone,
    email,
    userRole,
    studentId,
    scienceDegree,
    institute,
    department,
    group,
    universityId
  };
}
