import {
  RENDER_DEPARTMENTS,
  RENDER_GROUPS,
  RENDER_INSTITUTES
} from '../actions';
import StateLoader from '../../store/StateLoader';

export default function infoReducers(
  state = new StateLoader().loadState().infoReducers,
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
          return group;
        })
      };
    default:
      return state;
  }
}
