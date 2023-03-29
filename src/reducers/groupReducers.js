import {loadState} from '../store/StateLoader';
import {RENDER_GROUP, RENDER_GROUPS, RENDER_USER_GROUP} from '../actions/groupActions';
import {RENDER_INSTITUTES_FOR_REGISTRATION} from '../actions/instituteActions';
import {RENDER_DEPARTMENTS_FOR_REGISTRATION} from '../actions/departmentActions';
import {SIGN_OUT} from '../actions/authActions';

export default function groupReducers(
  state = loadState().groupReducers || {
    userGroup: undefined,
    groups: {}
  },
  action
) {
  switch (action.type) {
    case RENDER_USER_GROUP: {
      return {
        ...state,
        userGroup: toClientGroupRepresentation(action.payload.group)
      };
    }

    case RENDER_GROUPS: {
      let groups = {};
      action.payload.groups.forEach(group => {
        groups[group.id] = toClientGroupRepresentation(group)
      });

      return {
        ...state,
        groups: groups
      };
    }

    case RENDER_GROUP:
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.payload.group.id]: toClientGroupRepresentation(action.payload.group)
        }
      };

    case RENDER_INSTITUTES_FOR_REGISTRATION:
      return {
        ...state,
        groups: {}
      };

    case RENDER_DEPARTMENTS_FOR_REGISTRATION:
      return {
        ...state,
        groups: {}
      };

    case SIGN_OUT:
      return {
        userGroup: undefined,
        groups: {}
      };

    default:
      return state;
  }
}

function toClientGroupRepresentation(group) {
  return {
    value: group.id,
    label: group.name,
    departmentId: group.departmentId,
    course: group.course,
    startYear: group.startYear,
    universityId: group.universityId,
    teacherId: group.teacherId,
    isShowingInRegistration: group.visible
  };
}
