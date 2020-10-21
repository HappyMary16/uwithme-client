import { ADMIN, STUDENT, TEACHER } from '../constants/userRoles';

export const isStudent = user => user && user.role === STUDENT && !user.isAdmin;

export const isTeacher = user => user && user.role === TEACHER && !user.isAdmin;

export const isAdmin = user => user && (user.role === ADMIN || user.isAdmin);

export const getName = user =>
  user && user.surname + ' ' + user.firstName + ' ' + user.lastName;

export const findUserById = (users, id) =>
  users && users.filter(user => user.id === Number(id))[0];

export const findUsersByGroupId = (users, groupId) =>
  users && users.filter(user => user.studyGroupId === Number(groupId));

export const findAllStudentsWithoutGroup = users =>
  users &&
  users.filter(user => isStudent(user)).filter(user => !user.studyGroupId);
