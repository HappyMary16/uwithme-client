import StateLoader from '../store/StateLoader';
import {
  DEPARTMENT_CREATED,
  RENDER_DEPARTMENTS,
  RENDER_DEPARTMENTS_FOR_REGISTRATION,
  RENDER_USER_DEPARTMENT
} from '../actions/departmentActions';

export default function departmentReducers(
  state = new StateLoader().loadState().departmentReducers || {},
  action
) {
  switch (action.type) {
    case RENDER_USER_DEPARTMENT:
      return {
        ...state,
        userDepartment: action.payload.department
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

    case DEPARTMENT_CREATED:
      return {
        ...state,
        departments: [
          ...state.departments,
          {
            value: action.payload.department.id,
            label: action.payload.department.name,
            instituteId: action.payload.department.institute.id
          }
        ]
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

    default:
      return state;
  }
}
