import {
  ADD_TODO,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions';
import { RENDER_TODO_LIST } from '../actions';
import { USER_PROFILE_LOADED } from '../actions';

const initialState = {
  user: {
    firstName: '',
    lastName: '',
    username: '',
    phone: '',
    email: '',
    role: ''
  },
  toDoList: [],
  username: '',
  password: '',
  token: null
};

export default function toDoApp(state = initialState, action) {
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
        username: action.username,
        password: action.password
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        user: action.user
      };
    case LOGOUT:
      return {
        ...state,
        token: null
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
