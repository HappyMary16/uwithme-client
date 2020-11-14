import StateLoader from '../../store/StateLoader';
import {
  KEYCLOAK_SIGN_IN_SUCCESS,
  RENDER_DEPARTMENTS_FOR_REGISTRATION,
  RENDER_GROUPS_FOR_REGISTRATION,
  RENDER_INSTITUTES_FOR_REGISTRATION,
  RENDER_MY_AVATAR,
  RENDER_UNIVERSITIES_FOR_REGISTRATION,
  SIGN_IN_SUCCESS,
  SIGN_OUT
} from './actions';

export default function authReducers(
  state = new StateLoader().loadState().authReducers || {},
  action
) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload.user
      };

    case RENDER_MY_AVATAR: {
      return {
        ...state,
        avatar: action.payload.avatar
      };
    }

    case SIGN_OUT:
      return {
        isAuthenticated: false,
        user: null,
        avatar: null
      };

    case KEYCLOAK_SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      };

    case RENDER_UNIVERSITIES_FOR_REGISTRATION:
      return {
        ...state,
        universities: action.payload.universities.map(obj => {
          return {
            value: obj.id,
            label: obj.name
          };
        }),
        institutes: [],
        departments: [],
        groups: []
      };

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

    case RENDER_DEPARTMENTS_FOR_REGISTRATION:
      return {
        ...state,
        departments: action.payload.departments.map(obj => {
          let department = {};
          department.value = obj.id;
          department.label = obj.name;
          department.instituteId = obj.institute.id;
          return department;
        }),
        groups: []
      };

    case RENDER_GROUPS_FOR_REGISTRATION:
      return {
        ...state,
        groups: action.payload.groups.map(obj => {
          return {
            value: obj.id,
            label: obj.name,
            departmentId: obj.department.id,
            course: obj.course,
            departmentName: obj.department.name,
            instituteId: obj.department.institute.id,
            instituteName: obj.department.institute.name,
            universityId: obj.department.institute.universityId,
            teacherId: obj.teacherId,
            isShowingInRegistration: obj.isShowingInRegistration
          };
        })
      };

    default:
      return state;
  }
}
