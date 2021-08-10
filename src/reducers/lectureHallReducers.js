import StateLoader from "../store/StateLoader";
import {
  RENDER_BUILDINGS,
  RENDER_LECTURE_HALLS
} from "../actions/lectureHallActions";
import { SIGN_OUT } from "../actions/authActions";

export default function lectureHallReducers(
  state = new StateLoader().loadState().lectureHallReducers || {
    lectureHalls: [],
    buildings: []
  },
  action
) {
  switch (action.type) {
    case RENDER_LECTURE_HALLS:
      return {
        ...state,
        lectureHalls: action.payload.lectureHalls.map(lectureHall => {
          return {
            value: lectureHall.id,
            label: lectureHall.name,
            buildingId: lectureHall.building.id,
            placeNumber: lectureHall.placeNumber
          };
        })
      };

    case RENDER_BUILDINGS:
      return {
        ...state,
        buildings:
          action.payload.buildings &&
          action.payload.buildings.map(building => {
            return {
              value: building.id,
              label: building.name,
              universityId: building.universityId
            };
          })
      };

    case SIGN_OUT:
      return {
        lectureHalls: [],
        buildings: []
      };

    default:
      return state;
  }
}
