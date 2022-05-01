import StateLoader from '../store/StateLoader';
import {
  DEPARTMENT_CREATED,
  RENDER_DEPARTMENTS,
  RENDER_DEPARTMENTS_FOR_REGISTRATION,
  RENDER_USER_DEPARTMENT
} from '../actions/departmentActions';
import { RENDER_INSTITUTES_FOR_REGISTRATION } from '../actions/instituteActions';
import { SIGN_OUT } from '../actions/authActions';

export default function departmentReducers(
  state = new StateLoader().loadState().departmentReducers || {
    userDepartment: undefined,
    departments: {}
  },
  action
) {
  switch (action.type) {
    case RENDER_USER_DEPARTMENT:
      let department = action.payload.department;

      return {
        ...state,
        userDepartment: {
          value: department.id,
          label: department.name,
          instituteId: department.instituteId
        }
      };

    case RENDER_DEPARTMENTS:
    case RENDER_DEPARTMENTS_FOR_REGISTRATION: {
      let departments = {};
      action.payload.departments.forEach(department => {
        departments[department.id] = toClientDepartmentRepresentation(department)
      });

      return {
        ...state,
        departments: departments
      };
    }

    case DEPARTMENT_CREATED:
      return {
        ...state,
        departments: {
          ...state.departments,
          [action.payload.department.id]: toClientDepartmentRepresentation(action.payload.department)
        }
      };

    case RENDER_INSTITUTES_FOR_REGISTRATION:
      return {
        ...state,
        departments: {}
      };

    case SIGN_OUT:
      return {
        userDepartment: undefined,
        departments: {}
      };

    default:
      return state;
  }
}

function toClientDepartmentRepresentation(department) {
  return {
    value: department.id,
    label: department.name,
    instituteId: department.instituteId
  };
}
