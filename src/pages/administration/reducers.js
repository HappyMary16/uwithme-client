import StateLoader from '../../store/StateLoader';
import { DEPARTMENT_CREATED, INSTITUTE_CREATED, RENDER_DEPARTMENTS, RENDER_GROUPS, RENDER_INSTITUTES } from './actions';

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
          let group = {};
          group.value = obj.id;
          group.label = obj.name;
          group.departmentId = obj.departmentId;
          group.course = obj.course;
          return group;
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
    default:
      return state;
  }
}
