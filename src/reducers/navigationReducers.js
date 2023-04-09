import {CHANGE_IS_MENU_OPEN} from "../actions/navigationActions";
import {SIGN_OUT} from "../actions/authActions";

export default function navigationReducers(
  state = {
    errors: [],
    isMenuOpen: false
  },
  action
) {
  switch (action.type) {
    case CHANGE_IS_MENU_OPEN: {
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
    }
    case SIGN_OUT:
      return {
        errors: [],
        isMenuOpen: false
      };

    default:
      return state;
  }
}
