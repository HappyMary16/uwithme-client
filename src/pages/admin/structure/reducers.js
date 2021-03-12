import StateLoader from '../../../store/StateLoader';
import { SIGN_OUT } from '../../authorization/actions';

export default function adminReducers(
  state = new StateLoader().loadState().adminReducers || { groups: [] },
  action
) {
  switch (action.type) {
    case SIGN_OUT:
      return { groups: [] };
    default:
      return state;
  }
}
