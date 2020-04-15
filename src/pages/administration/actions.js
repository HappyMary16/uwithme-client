export const ADD_UNIVERSITY = 'ADD_UNIVERSITY';

export const CREATE_INSTITUTE = 'CREATE_INSTITUTE';
export const CREATE_DEPARTMENT = 'CREATE_DEPARTMENT';
export const CREATE_GROUP = 'CREATE_GROUP';
export const CREATE_LECTURE_HALL = 'CREATE_LECTURE_HALL';

export const INSTITUTE_CREATED = 'INSTITUTE_CREATED';
export const DEPARTMENT_CREATED = 'DEPARTMENT_CREATED';
export const GROUP_CREATED = 'GROUP_CREATED';
export const LECTURE_HALL_CREATED = 'LECTURE_HALL_CREATED';

export const LOAD_INSTITUTES_BY_UNIVERSITY_ID = 'LOAD_INSTITUTES_BY_UNIVERSITY_ID';
export const LOAD_DEPARTMENTS_BY_UNIVERSITY_ID = 'LOAD_DEPARTMENTS_BY_UNIVERSITY_ID';
export const LOAD_GROUPS_BY_UNIVERSITY_ID = 'LOAD_GROUPS_BY_UNIVERSITY_ID';

export const LOAD_INSTITUTES = 'LOAD_INSTITUTES';
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const LOAD_GROUPS = 'LOAD_GROUPS';
export const LOAD_LECTURE_HALLS = 'LOAD_LECTURE_HALLS';
export const LOAD_BUILDINGS = 'LOAD_BUILDINGS';

export const RENDER_INSTITUTES = 'RENDER_INSTITUTES';
export const RENDER_DEPARTMENTS = 'RENDER_DEPARTMENTS';
export const RENDER_GROUPS = 'RENDER_GROUPS';
export const RENDER_LECTURE_HALLS = 'RENDER_LECTURE_HALLS';
export const RENDER_BUILDINGS = 'RENDER_BUILDINGS';

export const addUniversity = (
  universityName,
  username,
  password,
  confirmPassword
) => ({
  type: ADD_UNIVERSITY,
  payload: {
    universityName: universityName,
    username: username,
    password: password,
    confirmPassword: confirmPassword
  }
});

export const createInstitute = (
  universityId,
  instituteName
) => ({
  type: CREATE_INSTITUTE,
  payload: {
    universityId,
    instituteName
  }
});

export const instituteCreated = (institute) => ({
  type: INSTITUTE_CREATED,
  payload: {
    institute
  }
});

export const createDepartment = (
  universityId,
  instituteName,
  departmentName
) => ({
  type: CREATE_DEPARTMENT,
  payload: {
    universityId,
    instituteName,
    departmentName
  }
});

export const departmentCreated = (department) => ({
  type: DEPARTMENT_CREATED,
  payload: {
    department
  }
});

export const createGroup = (
  universityId,
  instituteName,
  departmentName,
  course,
  groupName
) => ({
  type: CREATE_GROUP,
  payload: {
    universityId,
    instituteName,
    departmentName,
    course,
    groupName
  }
});

export const groupCreated = (group) => ({
  type: GROUP_CREATED,
  payload: {
    group
  }
});

export const loadInstitutes = () => ({
  type: LOAD_INSTITUTES
});

export const loadInstitutesByUniversityId = (universityId) => ({
  type: LOAD_INSTITUTES_BY_UNIVERSITY_ID,
  payload: universityId
});

export const loadDepartmentsByUniversityId = (universityId) => ({
  type: LOAD_DEPARTMENTS_BY_UNIVERSITY_ID,
  payload: universityId
});

export const loadGroupsByUniversityId = (universityId) => ({
  type: LOAD_GROUPS_BY_UNIVERSITY_ID,
  payload: universityId
});

export const loadDepartments = () => ({
  type: LOAD_DEPARTMENTS
});

export const loadGroups = () => ({
  type: LOAD_GROUPS
});

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

export const loadLectureHalls = (universityId) => ({
  type: LOAD_LECTURE_HALLS,
  payload: {
    universityId
  }
});

export const loadBuildings = (universityId) => ({
  type: LOAD_BUILDINGS,
  payload: {
    universityId
  }
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