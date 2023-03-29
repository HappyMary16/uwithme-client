import {loadState} from '../store/StateLoader';
import {
  INSTITUTE_CREATED,
  RENDER_INSTITUTES,
  RENDER_INSTITUTES_FOR_REGISTRATION,
  RENDER_USER_INSTITUTE
} from '../actions/instituteActions';
import {SIGN_OUT} from '../actions/authActions';

export default function instituteReducers(
  state = loadState().instituteReducers || {
    userInstitute: undefined,
    institutes: {}
  },
  action
) {
  switch (action.type) {

    case RENDER_INSTITUTES_FOR_REGISTRATION:
    case RENDER_INSTITUTES: {
      let institutes = {};
      action.payload.institutes.forEach(institute => {
        institutes[institute.id] = toClientInstituteRepresentation(institute)
      });

      return {
        ...state,
        institutes: institutes
      };
    }

    case INSTITUTE_CREATED:
      return {
        ...state,
        institutes: {
          ...state.institutes,
          [action.payload.institute.id]: toClientInstituteRepresentation(action.payload.institute)
        }
      };

    case RENDER_USER_INSTITUTE: {
      let institute = action.payload.institute;
      return {
        ...state,
        userInstitute: toClientInstituteRepresentation(institute)
      };
    }

    case SIGN_OUT:
      return {
        userInstitute: undefined,
        institutes: {}
      };

    default:
      return state;
  }
}

function toClientInstituteRepresentation(institute) {
  return {
    value: institute.id,
    label: institute.name,
    universityId: institute.universityId
  };
}
