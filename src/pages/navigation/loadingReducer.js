import { SIGN_OUT } from '../authorization/signIn/actions';
import {
  ADD_ERROR,
  CHANGE_IS_MENU_OPEN,
  END_FETCHING,
  REMOVE_ERROR,
  START_FETCHING
} from './actions';

export default function loadingProcess(
  state = { isFetching: 0, errors: [] },
  action
) {
  switch (action.type) {
    case START_FETCHING:
      return {
        ...state,
        isFetching: state.isFetching + 1
      };
    case END_FETCHING:
      return {
        ...state,
        isFetching: state.isFetching ? state.isFetching - 1 : state.isFetching
      };
    case CHANGE_IS_MENU_OPEN: {
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
    }
    case SIGN_OUT:
      return { isFetching: 0, errors: [] };
    case ADD_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload.error]
      };
    case REMOVE_ERROR:
      return {
        ...state,
        errors: state.errors.filter(error => action.payload.code !== error.code)
      };
    default:
      return state;
  }
}
