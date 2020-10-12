export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR';
export const SIGN_OUT = 'SIGN_OUT';

export const DOWNLOAD_MY_AVATAR = 'DOWNLOAD_MY_AVATAR';
export const RENDER_MY_AVATAR = 'RENDER_MY_AVATAR';

export const signInRequest = (username, password) => ({
  type: SIGN_IN_REQUEST,
  payload: {
    username,
    password
  }
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

export const signInError = () => ({
  type: SIGN_IN_ERROR
});

export const downloadMyAvatar = () => ({
  type: DOWNLOAD_MY_AVATAR
});

export const renderMyAvatar = avatar => ({
  type: RENDER_MY_AVATAR,
  payload: {
    avatar
  }
});
