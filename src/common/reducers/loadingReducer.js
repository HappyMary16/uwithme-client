import { END_FETCHING, START_FETCHING } from '../actions';

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
    default:
      return state;
  }
}
