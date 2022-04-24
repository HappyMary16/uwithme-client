import StateLoader from '../store/StateLoader';
import {
  RENDER_GROUP,
  RENDER_GROUPS,
  RENDER_GROUPS_FOR_REGISTRATION,
  RENDER_USER_GROUP
} from '../actions/groupActions';
import { RENDER_INSTITUTES_FOR_REGISTRATION } from '../actions/instituteActions';
import { RENDER_DEPARTMENTS_FOR_REGISTRATION } from '../actions/departmentActions';
import { SIGN_OUT } from '../actions/authActions';

export default function groupReducers(
  state = new StateLoader().loadState().groupReducers || {
    userGroup: undefined,
    groups: []
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

    case RENDER_GROUPS_FOR_REGISTRATION:
      return {
        ...state,
        groups: action.payload.groups.map(toClientGroupRepresentation)
      };

    case RENDER_GROUPS:
      return {
        ...state,
        groups: action.payload.groups.map(toClientGroupRepresentation)
      };

    case RENDER_GROUP: {
      let newGroup = toClientGroupRepresentation(action.payload.group);
      let isGroupUpdated = false;

      let updatedGroups = state.groups.map(group => {
        if (group.value === newGroup.id) {
          isGroupUpdated = true;
          return newGroup;
        } else {
          return group;
        }
      })

      if (!isGroupUpdated) {
        updatedGroups = [...state.groups, newGroup];
      }

      return {
        ...state,
        groups: updatedGroups
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
      return {
        userGroup: undefined,
        groups: []
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
    universityId: group.universityId,
    teacherId: group.teacherId,
    isShowingInRegistration: group.isVisible
  };
}
