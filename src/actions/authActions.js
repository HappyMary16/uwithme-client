export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_OUT = "SIGN_OUT";

export const REGISTRATION_COMPLETE = "REGISTRATION_COMPLETE";

export const signOut = () => ({
  type: SIGN_OUT
});

export const signInSuccess = user => ({
  type: SIGN_IN_SUCCESS,
  payload: {
    user
  }
});