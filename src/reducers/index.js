import { ADD_TODO } from '../actions';
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
    default:
      return state;
  }
}
