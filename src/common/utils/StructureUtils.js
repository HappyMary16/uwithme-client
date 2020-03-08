export const getGroupsByDepartment = (groups, department) => {
  return groups.filter(group => group.departmentId === department.value);
};

export const getDepartmentsByInstitute = (departments, institute) => {
  return departments.filter(
    department => department.instituteId === institute.value
  );
};
