import { END_FETCHING, START_FETCHING } from '../actions';
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
    case SIGN_OUT:
      return { isFetching: 0 };
    default:
      return state;
  }
}
