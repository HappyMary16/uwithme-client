import StateLoader from '../../../store/StateLoader';
import {
  DEPARTMENT_CREATED,
  GROUP_CREATED,
  INSTITUTE_CREATED,
  RENDER_DEPARTMENTS,
  RENDER_GROUPS,
  RENDER_INSTITUTES,
  RENDER_UNIVERSITIES
} from './actions';
import { SIGN_OUT } from '../../authorization/actions';

export default function adminReducers(
  state = new StateLoader().loadState().adminReducers || {},
  action
) {
  switch (action.type) {
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
    case RENDER_DEPARTMENTS:
      return {
        ...state,
        departments: action.departments.data.map(obj => {
          let department = {};
          department.value = obj.id;
          department.label = obj.name;
          department.instituteId = obj.instituteId;
          return department;
        })
      };
    case RENDER_GROUPS:
      return {
        ...state,
        groups: action.groups.data.map(obj => {
          return {
            value: obj.id,
            label: obj.name,
            departmentId: obj.departmentId,
            course: obj.course,
            departmentName: obj.departmentName,
            instituteId: obj.instituteId,
            instituteName: obj.instituteName,
            teacherId: obj.teacherId,
            isShowingInRegistration: obj.isShowingInRegistration
          };
        })
      };

    case RENDER_UNIVERSITIES:
      return {
        ...state,
        universities: action.payload.universities.map(obj => {
          return {
            value: obj.id,
            label: obj.name
          };
        })
      };

    case INSTITUTE_CREATED:
      return {
        ...state,
        institutes: [...state.institutes,
          {
            value: action.payload.institute.id,
            label: action.payload.institute.name,
            universityId: action.payload.institute.universityId
          }]
      };
    case DEPARTMENT_CREATED:
      return {
        ...state,
        departments: [...state.departments,
          {
            value: action.payload.department.id,
            label: action.payload.department.name,
            instituteId: action.payload.department.instituteId
          }]
      };
    case GROUP_CREATED:
      return {
        ...state,
        groups: [...state.groups,
          {
            value: action.payload.group.id,
            label: action.payload.group.name,
            departmentId: action.payload.group.departmentId,
            course: action.payload.group.course
          }]
      };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
