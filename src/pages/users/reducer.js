import { RENDER_TEACHERS } from './actions';


export default function teacherReducer(
  state = {},
  action
) {
  switch (action.type) {
    case RENDER_TEACHERS:
      return {
        ...state,
        teachers: action.payload.teachers
      };
    default:
      return state;
  }
}
