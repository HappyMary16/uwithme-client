import { ADD_TODO, LOGIN_REQUEST, SAVE_TOKEN } from '../actions';
import { RENDER_TODO_LIST } from '../actions';
import { USER_PROFILE_LOADED } from '../actions';

const initialState = {
  toDoList: [],
  username: '',
  password: '',
  token: {}
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
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.token
      };
    default:
      return state;
  }
}
