import {
  ADD_TODO,
  RENDER_DEPARTMENTS,
  RENDER_INSTITUTES,
  RENDER_GROUPS
} from '../actions';
import StateLoader from '../store/StateLoader';

export default function toDoApp(state = new StateLoader().loadState(), action) {
  switch (action.type) {
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
    case RENDER_INSTITUTES:
      return {
        ...state,
        institutes: action.institutes
      };
    case RENDER_DEPARTMENTS:
      return {
        ...state,
        departments: action.departments
      };
    case RENDER_GROUPS:
      return {
        ...state,
        groups: action.groups
      };
    default:
      return state;
  }
}
