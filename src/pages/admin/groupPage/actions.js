import { RENDER_GROUPS } from '../structure/actions';

export const LOAD_GROUP_BY_ID = 'LOAD_GROUPS_BY_ID';
export const LOAD_STUDENTS_BY_GROUP_ID = 'LOAD_STUDENTS_BY_GROUP_ID';
export const LOAD_STUDENTS_WITHOUT_GROUP = 'LOAD_STUDENTS_WITHOUT_GROUP';
export const REMOVE_STUDENT_FROM_GROUP = 'REMOVE_STUDENT_FROM_GROUP';
export const ADD_STUDENT_TO_GROUP = 'ADD_STUDENT_TO_GROUP';

export const renderGroups = groups => ({
  type: RENDER_GROUPS,
  payload: {
    groups
  }
});

export const loadGroupById = groupId => ({
  type: LOAD_GROUP_BY_ID,
  payload: {
    id: groupId
  }
});

export function loadStudentsByGroupId(groupId) {
  return {
    type: LOAD_STUDENTS_BY_GROUP_ID,
    payload: {
      groupId
    }
  };
}

export function loadStudentsWithoutGroup() {
  return {
    type: LOAD_STUDENTS_WITHOUT_GROUP
  };
}

export function removeStudentFromGroup(studentId) {
  return {
    type: REMOVE_STUDENT_FROM_GROUP,
    payload: {
      studentId
    }
  };
}

export function addStudentToGroup(studentIds, groupId) {
  return {
    type: ADD_STUDENT_TO_GROUP,
    payload: {
      studentIds,
      groupId
    }
  };
}
