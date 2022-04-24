export const CREATE_GROUP = "CREATE_GROUP";

export const LOAD_GROUP_BY_ID = "LOAD_GROUPS_BY_ID";
export const LOAD_GROUP = "LOAD_GROUP";
export const LOAD_GROUPS = "LOAD_GROUPS";
export const LOAD_GROUPS_BY_UNIVERSITY_ID = "LOAD_GROUPS_BY_UNIVERSITY_ID";
export const LOAD_GROUPS_BY_TEACHER = "LOAD_GROUPS_BY_TEACHER";

export const RENDER_GROUP = "RENDER_GROUP";
export const RENDER_USER_GROUP = "RENDER_USER_GROUP";
export const RENDER_GROUPS = "RENDER_GROUPS";
export const RENDER_GROUPS_FOR_REGISTRATION = "RENDER_GROUPS_FOR_REGISTRATION";

export const loadGroupById = groupId => ({
  type: LOAD_GROUP_BY_ID,
  payload: {
    id: groupId
  }
});

export const loadGroups = departmentId => ({
  type: LOAD_GROUPS,
  payload: {
    departmentId
  }
});

export const loadGroupsByTeacher = () => ({
  type: LOAD_GROUPS_BY_TEACHER
});

export const renderGroupsForRegistration = groups => ({
  type: RENDER_GROUPS_FOR_REGISTRATION,
  payload: {
    groups
  }
});

export const createGroup = (
  universityId,
  instituteId,
  instituteName,
  departmentId,
  departmentName,
  course,
  groupName,
  isShowingInRegistration
) => ({
  type: CREATE_GROUP,
  payload: {
    universityId,
    instituteId,
    instituteName,
    departmentId,
    departmentName,
    course,
    groupName,
    isShowingInRegistration
  }
});

export const renderGroup = group => ({
  type: RENDER_GROUP,
  payload: {
    group
  }
});

export const renderUserGroup = group => ({
  type: RENDER_USER_GROUP,
  payload: {
    group
  }
});

export const renderGroups = groups => ({
  type: RENDER_GROUPS,
  payload: {
    groups
  }
});

export const loadGroup = () => ({
  type: LOAD_GROUP
});

export const loadGroupsByUniversityId = universityId => ({
  type: LOAD_GROUPS_BY_UNIVERSITY_ID,
  payload: {
    universityId
  }
});
