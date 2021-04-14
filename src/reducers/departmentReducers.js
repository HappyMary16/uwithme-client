import StateLoader from '../store/StateLoader';
import {
  DEPARTMENT_CREATED,
  RENDER_DEPARTMENTS,
  RENDER_DEPARTMENTS_FOR_REGISTRATION,
  RENDER_USER_DEPARTMENT
} from '../actions/departmentActions';
import { RENDER_INSTITUTES_FOR_REGISTRATION } from '../actions/instituteActions';
import { SIGN_OUT } from '../pages/authorization/actions';

export default function departmentReducers(
  state = new StateLoader().loadState().departmentReducers || {},
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
          instituteId: department.institute.id
        }
      };

    case RENDER_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload.departments.map(department => {
          return {
            value: department.id,
            label: department.name,
            instituteId: department.institute.id
          };
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
        departments: action.payload.departments.map(department => {
          return {
            value: department.id,
            label: department.name,
            instituteId: department.institute.id
          };
        })
      };

    case RENDER_INSTITUTES_FOR_REGISTRATION:
      return {
        ...state,
        departments: []
      };

    case SIGN_OUT:
      return {};

    default:
      return state;
  }
}