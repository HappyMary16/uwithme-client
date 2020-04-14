export const getGroupsByDepartment = (groups, department) => {
  return groups && groups.filter(group => group.departmentId === department.value);
};

export const getDepartmentsByInstitute = (departments, institute) => {
  return departments && departments.filter(
    department => department.instituteId === institute.value
  );
};

export const getInstituteById = (institutes, instituteId) => {
  return Array.isArray(institutes)
    && institutes.filter(institute => institute.value === instituteId)[0];
};
