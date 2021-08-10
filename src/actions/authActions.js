export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";

export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";

export const REGISTRATION_COMPLETE = "REGISTRATION_COMPLETE";

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

export const signInRequest = () => ({
  type: SIGN_IN_REQUEST
});

export const signOut = () => ({
  type: SIGN_OUT
});

export const signInSuccess = user => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    user
  }
});

export const updateRegistrationComplete = () => ({
  type: REGISTRATION_COMPLETE
});
