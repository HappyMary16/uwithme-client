export const LOAD_UNIVERSITIES = 'LOAD_UNIVERSITIES';
export const LOAD_UNIVERSITY = 'LOAD_UNIVERSITY';

export const RENDER_USER_UNIVERSITY = 'RENDER_USER_UNIVERSITY';
export const RENDER_UNIVERSITIES_FOR_REGISTRATION =
  'RENDER_UNIVERSITIES_FOR_REGISTRATION';

export const loadUniversity = () => ({
  type: LOAD_UNIVERSITY
});

export const loadUniversities = () => ({
  type: LOAD_UNIVERSITIES
});

export const renderUniversitiesForRegistration = universities => ({
  type: RENDER_UNIVERSITIES_FOR_REGISTRATION,
  payload: {
    universities
  }
});

export const renderUserUniversity = university => ({
  type: RENDER_USER_UNIVERSITY,
  payload: {
    university
  }
});
