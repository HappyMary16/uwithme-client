export const ADD_ACCESS_TO_FILES = 'ADD_ACCESS_TO_FILES';

export function addAccessToFiles(fileIds, groupIds) {
  return {
    type: ADD_ACCESS_TO_FILES,
    fileIds,
    groupIds
  };
}
