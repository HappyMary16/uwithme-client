export const SET_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

export const ADD_ERROR = 'ADD_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export const setMessage = message => ({
  type: SET_MESSAGE,
  payload: {
    message
  }
});

export const removeMessage = () => ({
  type: REMOVE_MESSAGE
});

export const addError = error => ({
  type: ADD_ERROR,
  payload: {
    error
  }
});

export const removeError = id => ({
  type: REMOVE_ERROR,
  payload: {
    id
  }
});
