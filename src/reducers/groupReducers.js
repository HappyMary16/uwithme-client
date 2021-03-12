import StateLoader from '../store/StateLoader';
import {
  RENDER_GROUP,
  RENDER_GROUPS,
  RENDER_GROUPS_FOR_REGISTRATION,
  RENDER_USER_GROUP
} from '../actions/groupActions';

export default function groupReducers(
  state = new StateLoader().loadState().groupReducers || {},
  action
) {
  switch (action.type) {
    case RENDER_USER_GROUP:
      return {
        ...state,
        userGroup: action.payload.group
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

    case RENDER_GROUP:
      return {
        ...state,
        groups: [
          ...state.groups.filter(
            group => group.value !== action.payload.group.id
          ),
          {
            value: action.payload.group.id,
            label: action.payload.group.name,
            departmentId: action.payload.group.department.id,
            course: action.payload.group.course,
            departmentName: action.payload.group.department.name,
            instituteId: action.payload.group.department.institute.id,
            instituteName: action.payload.group.department.institute.name,
            universityId:
              action.payload.group.department.institute.universityId,
            teacherId: action.payload.group.teacherId,
            isShowingInRegistration:
              action.payload.group.isShowingInRegistration
          }
        ]
      };

    default:
      return state;
  }
}
