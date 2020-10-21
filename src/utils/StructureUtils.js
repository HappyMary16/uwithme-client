export const getGroupsByDepartment = (groups, department) => {
  return (
    groups && groups.filter(group => group.departmentId === department.value)
  );
};

export const getDepartmentsByInstitute = (departments, institute) => {
  return (
    departments &&
    departments.filter(department => department.instituteId === institute.value)
  );
};

export const getInstituteById = (institutes, instituteId) => {
  return (
    institutes &&
    institutes.filter(institute => institute.value === instituteId)[0]
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
    groups.filter(group => Number(group.value) === Number(groupId))[0]
  );
};
