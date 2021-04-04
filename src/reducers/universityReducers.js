import StateLoader from '../store/StateLoader';
import {
  RENDER_UNIVERSITIES_FOR_REGISTRATION,
  RENDER_USER_UNIVERSITY
} from '../actions/universityActions';
import { SIGN_OUT } from '../pages/authorization/actions';

export default function universityReducers(
  state = new StateLoader().loadState().universityReducers || {},
  action
) {
  switch (action.type) {

    case RENDER_USER_UNIVERSITY:
      return {
        ...state,
        userUniversity: {
          value: action.payload.university.id,
          label: action.payload.university.name
        }
      };

    case RENDER_UNIVERSITIES_FOR_REGISTRATION:
      return {
        ...state,
        universities: action.payload.universities.map(obj => {
          return {
            value: obj.id,
            label: obj.name
          };
        })
      };

    case SIGN_OUT:
      return {};

    default:
      return state;
  }
}
