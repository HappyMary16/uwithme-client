import { LECTURE_HALL_CREATED, RENDER_BUILDINGS, RENDER_LECTURE_HALLS } from './action';

export default function lectureHallReducer(
  state = {},
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
            buildingId: lectureHall.buildingId,
            placeNumber: lectureHall.placeNumber
          };
        })
      };
    case RENDER_BUILDINGS:
      return {
        ...state,
        buildings: action.payload.buildings.map(building => {
          return {
            value: building.id,
            label: building.name,
            universityId: building.universityId
          };
        })
      };
    case LECTURE_HALL_CREATED:
      return {
        ...state,
        lectureHalls: [...state.lectureHalls,
          {
            value: action.payload.lectureHall.id,
            label: action.payload.lectureHall.name,
            buildingId: action.payload.lectureHall.buildingId,
            placeNumber: action.payload.lectureHall.placeNumber
          }]
      };
    default:
      return state;
  }
}