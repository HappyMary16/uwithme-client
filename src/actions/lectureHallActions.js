export const CREATE_LECTURE_HALL = 'CREATE_LECTURE_HALL';
export const LOAD_LECTURE_HALLS = 'LOAD_LECTURE_HALLS';
export const LOAD_BUILDINGS = 'LOAD_BUILDINGS';
export const RENDER_LECTURE_HALLS = 'RENDER_LECTURE_HALLS';
export const RENDER_LECTURE_HALL = 'RENDER_LECTURE_HALL';
export const RENDER_BUILDINGS = 'RENDER_BUILDINGS';
export const RENDER_BUILDING = 'RENDER_BUILDING';

export const renderLectureHalls = lectureHalls => ({
  type: RENDER_LECTURE_HALLS,
  payload: lectureHalls
});

export const renderLectureHall = lectureHall => ({
  type: RENDER_LECTURE_HALL,
  payload: lectureHall
});

export const renderBuildings = buildings => ({
  type: RENDER_BUILDINGS,
  payload: buildings
});

export const renderBuilding = building => ({
  type: RENDER_BUILDING,
  payload: building
});

export const loadLectureHalls = () => ({
  type: LOAD_LECTURE_HALLS
});

export const loadBuildings = () => ({
  type: LOAD_BUILDINGS
});

export const createLectureHall = (
  universityId,
  buildingName,
  buildingId,
  lectureHallName,
  placeNumber
) => ({
  type: CREATE_LECTURE_HALL,
  payload: {
    universityId,
    buildingName,
    buildingId,
    lectureHallName,
    placeNumber
  }
});
