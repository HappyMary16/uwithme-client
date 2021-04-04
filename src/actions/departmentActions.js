export const CREATE_DEPARTMENT = 'CREATE_DEPARTMENT';

export const LOAD_DEPARTMENT = 'LOAD_DEPARTMENT';
export const LOAD_DEPARTMENTS = 'LOAD_DEPARTMENTS';
export const LOAD_DEPARTMENTS_BY_UNIVERSITY_ID =
  'LOAD_DEPARTMENTS_BY_UNIVERSITY_ID';

export const DEPARTMENT_CREATED = 'DEPARTMENT_CREATED';
export const RENDER_USER_DEPARTMENT = 'RENDER_USER_DEPARTMENT';
export const RENDER_DEPARTMENTS = 'RENDER_DEPARTMENTS';
export const RENDER_DEPARTMENTS_FOR_REGISTRATION =
  'RENDER_DEPARTMENTS_FOR_REGISTRATION';

export const loadDepartments = instituteId => ({
  type: LOAD_DEPARTMENTS,
  payload: {
    instituteId
  }
});

export const renderUserDepartment = department => ({
  type: RENDER_USER_DEPARTMENT,
  payload: {
    department
  }
});

export const renderDepartments = departments => ({
  type: RENDER_DEPARTMENTS,
  payload: {
    departments
  }
});

export const renderDepartmentForRegistration = departments => ({
  type: RENDER_DEPARTMENTS_FOR_REGISTRATION,
  payload: {
    departments
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

export const departmentCreated = department => ({
  type: DEPARTMENT_CREATED,
  payload: {
    department
  }
});

export const loadDepartment = () => ({
  type: LOAD_DEPARTMENT
});

export const loadDepartmentsByUniversityId = () => ({
  type: LOAD_DEPARTMENTS_BY_UNIVERSITY_ID
});
