export const ADD_ACCESS_TO_FILES = 'ADD_ACCESS_TO_FILES';
export const LOAD_GROUPS_BY_TEACHER = 'LOAD_GROUPS_BY_TEACHER';

export const loadGroupsByTeacher = () => ({
  type: LOAD_GROUPS_BY_TEACHER
});

export function addAccessToFiles(fileIds, groupIds) {
  return {
    type: ADD_ACCESS_TO_FILES,
    fileIds,
    groupIds
  };
}
