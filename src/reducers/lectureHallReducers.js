import StateLoader from '../store/StateLoader';
import {
  RENDER_BUILDING,
  RENDER_BUILDINGS,
  RENDER_LECTURE_HALL,
  RENDER_LECTURE_HALLS
} from '../actions/lectureHallActions';
import { SIGN_OUT } from '../actions/authActions';

export default function lectureHallReducers(
  state = new StateLoader().loadState().lectureHallReducers || {
    lectureHalls: {},
    buildings: {}
  },
  action
) {
  switch (action.type) {
    case RENDER_LECTURE_HALLS: {
      let lectureHalls = {};
      action.payload.forEach(hall => {
        lectureHalls[hall.id] = toClientLectureHallRepresentation(hall)
      });

      return {
        ...state,
        lectureHalls: lectureHalls
      };
    }

    case RENDER_LECTURE_HALL:
      return {
        ...state,
        lectureHalls: {
          ...state.lectureHalls,
          [action.payload.id]: toClientLectureHallRepresentation(action.payload)
        }
      };

    case RENDER_BUILDINGS: {
      let buildings = {};
      action.payload.forEach(building => {
        buildings[building.id] = toClientBuildingRepresentation(building)
      });

      return {
        ...state,
        buildings: buildings
      };
    }

    case RENDER_BUILDING:
      return {
        ...state,
        buildings: {
          ...state.buildings,
          [action.payload.id]: toClientBuildingRepresentation(action.payload)
        }
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

function toClientLectureHallRepresentation(lectureHall) {
  return {
    value: lectureHall.id,
    label: lectureHall.name,
    buildingId: lectureHall.buildingId,
    placeNumber: lectureHall.placeNumber
  };
}

function toClientBuildingRepresentation(building) {
  return {
    value: building.id,
    label: building.name,
    shortName: building.shortName,
    universityId: building.universityId
  };
}