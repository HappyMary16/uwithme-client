import {
  CHANGE_IS_MENU_OPEN,
  END_FETCHING,
  START_FETCHING
} from "../actions/navigationActions";
import { SIGN_OUT } from "../actions/authActions";

export default function navigationReducers(
  state = {
    isFetching: 0,
    errors: [],
    isMenuOpen: false
  },
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
      return {
        isFetching: 0,
        errors: [],
        isMenuOpen: false
      };

    default:
      return state;
  }
}
