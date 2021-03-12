export const CREATE_INSTITUTE = 'CREATE_INSTITUTE';

export const LOAD_INSTITUTES = 'LOAD_INSTITUTES';
export const LOAD_INSTITUTE = 'LOAD_INSTITUTE';
export const LOAD_INSTITUTES_BY_UNIVERSITY_ID =
  'LOAD_INSTITUTES_BY_UNIVERSITY_ID';

export const INSTITUTE_CREATED = 'INSTITUTE_CREATED';
export const RENDER_INSTITUTES_FOR_REGISTRATION =
  'RENDER_INSTITUTES_FOR_REGISTRATION';
export const RENDER_INSTITUTES = 'RENDER_INSTITUTES';
export const RENDER_USER_INSTITUTE = 'RENDER_USER_INSTITUTE';

export const loadInstitutes = universityId => ({
  type: LOAD_INSTITUTES,
  payload: {
    universityId
  }
});

export const loadInstitute = () => ({
  type: LOAD_INSTITUTE
});

export const renderInstitutes = institutes => ({
  type: RENDER_INSTITUTES,
  payload: {
    institutes
  }
});

export const renderUserInstitute = institute => ({
  type: RENDER_USER_INSTITUTE,
  payload: {
    institute
  }
});

export const renderInstitutesForRegistration = institutes => ({
  type: RENDER_INSTITUTES_FOR_REGISTRATION,
  payload: {
    institutes
  }
});

export const createInstitute = instituteName => ({
  type: CREATE_INSTITUTE,
  payload: {
    instituteName
  }
});

export const instituteCreated = institute => ({
  type: INSTITUTE_CREATED,
  payload: {
    institute
  }
});

export const loadInstitutesByUniversityId = () => ({
  type: LOAD_INSTITUTES_BY_UNIVERSITY_ID
});
