import StateLoader from '../store/StateLoader';
import {
  RENDER_GROUP,
  RENDER_GROUPS,
  RENDER_GROUPS_FOR_REGISTRATION,
  RENDER_USER_GROUP
} from '../actions/groupActions';
import { RENDER_INSTITUTES_FOR_REGISTRATION } from '../actions/instituteActions';
import { RENDER_DEPARTMENTS_FOR_REGISTRATION } from '../actions/departmentActions';
import { SIGN_OUT } from '../pages/authorization/actions';

export default function groupReducers(
  state = new StateLoader().loadState().groupReducers || {},
  action
) {
  switch (action.type) {

    case RENDER_USER_GROUP: {
      let group = action.payload.group;
      return {
        ...state,
        userGroup: {
          value: group.id,
          label: group.name,
          departmentId: group.department.id,
          course: group.course,
          departmentName: group.department.name,
          instituteId: group.department.institute.id,
          instituteName: group.department.institute.name,
          universityId: group.department.institute.universityId,
          teacherId: group.teacherId,
          isShowingInRegistration: group.isShowingInRegistration
        }
      };
    }
    case RENDER_GROUPS_FOR_REGISTRATION:
      return {
        ...state,
        groups: action.payload.groups.map(group => {
          return {
            value: group.id,
            label: group.name,
            departmentId: group.department.id,
            course: group.course,
            departmentName: group.department.name,
            instituteId: group.department.institute.id,
            instituteName: group.department.institute.name,
            universityId: group.department.institute.universityId,
            teacherId: group.teacherId,
            isShowingInRegistration: group.isShowingInRegistration
          };
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

    case RENDER_GROUP: {
      let group = action.payload.group;
      return {
        ...state,
        groups: [
          ...state.groups.filter(
            group => group.value !== action.payload.group.id
          ),
          {
            value: group.id,
            label: group.name,
            departmentId: group.department.id,
            course: group.course,
            departmentName: group.department.name,
            instituteId: group.department.institute.id,
            instituteName: group.department.institute.name,
            universityId: group.department.institute.universityId,
            teacherId: group.teacherId,
            isShowingInRegistration: group.isShowingInRegistration
          }
        ]
      };
    }

    case RENDER_INSTITUTES_FOR_REGISTRATION:
      return {
        ...state,
        groups: []
      };

    case RENDER_DEPARTMENTS_FOR_REGISTRATION:
      return {
        ...state,
        groups: []
      };

    case SIGN_OUT:
      return {};

    default:
      return state;
  }
}
