import StateLoader from '../store/StateLoader';
import {
  INSTITUTE_CREATED,
  RENDER_INSTITUTES,
  RENDER_INSTITUTES_FOR_REGISTRATION,
  RENDER_USER_INSTITUTE
} from '../actions/instituteActions';

export default function instituteReducers(
  state = new StateLoader().loadState().instituteReducers || {},
  action
) {
  switch (action.type) {
    case RENDER_INSTITUTES_FOR_REGISTRATION:
      return {
        ...state,
        institutes: action.payload.institutes.map(obj => {
          let institute = {};
          institute.value = obj.id;
          institute.label = obj.name;
          institute.universityId = obj.universityId;
          return institute;
        }),
        departments: [],
        groups: []
      };

    case RENDER_INSTITUTES:
      return {
        ...state,
        institutes: action.institutes.data.map(obj => {
          let institute = {};
          institute.value = obj.id;
          institute.label = obj.name;
          institute.universityId = obj.universityId;
          return institute;
        })
      };

    case RENDER_USER_INSTITUTE:
      return {
        ...state,
        userInstitute: action.payload.institute
      };

    case INSTITUTE_CREATED:
      return {
        ...state,
        institutes: [
          ...state.institutes,
          {
            value: action.payload.institute.id,
            label: action.payload.institute.name,
            universityId: action.payload.institute.universityId
          }
        ]
      };

    default:
      return state;
  }
}
