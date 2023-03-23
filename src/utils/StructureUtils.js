import { SEMESTER_NUMBER } from '../constants/userRoles';

export const getGroupsByDepartment = (groups, department) => {
  return (
    groups && Object.values(groups).filter(group => group.departmentId === department.value)
  );
};

export const getDepartmentsByInstitute = (departments, institute) => {
  return (
    departments &&
    Object.values(departments).filter(department => department.instituteId === institute?.value)
  );
};

export const getLectureHallsByBuilding = (lectureHalls, building) => {
  return (
    lectureHalls &&
    lectureHalls.filter(
      lectureHall => lectureHall.buildingId === building.value
    )
  );
};

export const getBuildingByLectureHall = (buildings, lectureHall) => {
  return (
    buildings &&
    buildings.filter(building => building.value === lectureHall.buildingId)[0]
  );
};

export const getGroupById = (groups, groupId) => {
  return (
    groups &&
    groupId &&
    Object.values(groups).filter(group => Number(group.value) === Number(groupId))[0]
  );
};

export const getSemesterById = semesterId => {
  return SEMESTER_NUMBER.filter(
    semester => Number(semester.value) === Number(semesterId)
  )[0];
};
