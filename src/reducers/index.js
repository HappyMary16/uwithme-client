import {
  ADD_TODO,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGN_OUT
} from '../actions';
import { RENDER_TODO_LIST } from '../actions';
import { USER_PROFILE_LOADED } from '../actions';
import StateLoader from '../store/StateLoader';

export default function toDoApp(state = new StateLoader().loadState(), action) {
  switch (action.type) {
    case RENDER_TODO_LIST:
      return {
        ...state,
        toDoList: action.toDoList
      };
    case ADD_TODO:
      let newToDoList = [
        ...state.toDoList,
        {
          ...action.toDoItem
        }
      ];
      return {
        ...state,
        toDoList: newToDoList
      };
    case USER_PROFILE_LOADED:
      return {
        ...state,
        user: action.user
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.username,
          password: action.password
        }
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token
      };
    case SIGN_OUT:
      return {
        ...state,
        token: null,
        user: null
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}
