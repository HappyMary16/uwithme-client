import StateLoader from '../../../store/StateLoader';
import {
  DEPARTMENT_CREATED,
  INSTITUTE_CREATED,
  RENDER_DEPARTMENTS,
  RENDER_GROUP,
  RENDER_GROUPS,
  RENDER_INSTITUTES,
  RENDER_UNIVERSITIES
} from './actions';
import { SIGN_OUT } from '../../authorization/actions';

export default function adminReducers(
  state = new StateLoader().loadState().adminReducers || { groups: [] },
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
          department.instituteId = obj.institute.id;
          return department;
        })
      };
    case RENDER_GROUPS:
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
            instituteId: action.payload.department.institute.id
          }]
      };
    case RENDER_GROUP:
      console.log(action.groups);
      return {
        ...state,
        groups: [...state.groups.filter(group => group.value !== action.payload.group.id),
          {
            value: action.payload.group.id,
            label: action.payload.group.name,
            departmentId: action.payload.group.department.id,
            course: action.payload.group.course,
            departmentName: action.payload.group.department.name,
            instituteId: action.payload.group.department.institute.id,
            instituteName: action.payload.group.department.institute.name,
            universityId: action.payload.group.department.institute.universityId,
            teacherId: action.payload.group.teacherId,
            isShowingInRegistration: action.payload.group.isShowingInRegistration
          }]
      };
    case SIGN_OUT:
      return { groups: [] };
    default:
      return state;
  }
}
