export const CREATE_LECTURE_HALL = 'CREATE_LECTURE_HALL';
export const LECTURE_HALL_CREATED = 'LECTURE_HALL_CREATED';
export const LOAD_LECTURE_HALLS = 'LOAD_LECTURE_HALLS';
export const LOAD_BUILDINGS = 'LOAD_BUILDINGS';
export const RENDER_LECTURE_HALLS = 'RENDER_LECTURE_HALLS';
export const RENDER_BUILDINGS = 'RENDER_BUILDINGS';

export const renderLectureHalls = (lectureHalls) => ({
  type: RENDER_LECTURE_HALLS,
  payload: {
    lectureHalls
  }
});

export const renderBuildings = (buildings) => ({
  type: RENDER_BUILDINGS,
  payload: {
    buildings
  }
});

export const loadLectureHalls = () => ({
  type: LOAD_LECTURE_HALLS
});

export const loadBuildings = () => ({
  type: LOAD_BUILDINGS
});

export const createLectureHall = (universityId,
                                  buildingName,
                                  lectureHallName,
                                  placeNumber) => ({
  type: CREATE_LECTURE_HALL,
  payload: {
    universityId,
    buildingName,
    lectureHallName,
    placeNumber
  }
});

export const lectureHallCreated = (lectureHall) => ({
  type: LECTURE_HALL_CREATED,
  payload: {
    lectureHall
  }
});