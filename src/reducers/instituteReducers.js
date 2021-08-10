import StateLoader from "../store/StateLoader";
import {
  INSTITUTE_CREATED,
  RENDER_INSTITUTES,
  RENDER_INSTITUTES_FOR_REGISTRATION,
  RENDER_USER_INSTITUTE
} from "../actions/instituteActions";
import { SIGN_OUT } from "../actions/authActions";

export default function instituteReducers(
  state = new StateLoader().loadState().instituteReducers || {
    userInstitute: undefined,
    institutes: []
  },
  action
) {
  switch (action.type) {
    case RENDER_INSTITUTES_FOR_REGISTRATION:
      return {
        ...state,
        institutes: action.payload.institutes.map(institute => {
          return {
            value: institute.id,
            label: institute.name,
            universityId: institute.universityId
          };
        })
      };

    case RENDER_INSTITUTES:
      return {
        ...state,
        institutes: action.payload.institutes.map(institute => {
          return {
            value: institute.id,
            label: institute.name,
            universityId: institute.universityId
          };
        })
      };

    case RENDER_USER_INSTITUTE: {
      let institute = action.payload.institute;
      return {
        ...state,
        userInstitute: {
          value: institute.id,
          label: institute.name,
          universityId: institute.universityId
        }
      };
    }

    case INSTITUTE_CREATED: {
      let institute = action.payload.institute;
      return {
        ...state,
        institutes: [
          ...state.institutes,
          {
            value: institute.id,
            label: institute.name,
            universityId: institute.universityId
          }
        ]
      };
    }

    case SIGN_OUT:
      return {
        userInstitute: undefined,
        institutes: []
      };

    default:
      return state;
  }
}
