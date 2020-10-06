import { CHANGE_IS_MENU_OPEN, END_FETCHING, START_FETCHING } from '../actions';
import { SIGN_OUT } from '../../pages/authorization/actions';

export default function loadingProcess(state = { isFetching: 0 }, action) {
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
      return { isFetching: 0 };
    default:
      return state;
  }
}
