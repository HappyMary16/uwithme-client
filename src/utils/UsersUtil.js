import { ADMIN, STUDENT, TEACHER } from '../constants/userRoles';

export const isStudent = user => user && user.role === STUDENT && !user.isAdmin;

export const isTeacher = user => user && user.role === TEACHER && !user.isAdmin;

export const isAdmin = user => user && (user.role === ADMIN || user.isAdmin);

export const getName = user => {
  if (!user) {
    return '';
  }

  const surname = !!user.surname ? user.surname : '';
  const firstName = typeof user.firstName === 'string' ? user.firstName : '';
  const lastName = typeof user.lastName === 'string' ? user.lastName : '';
  return surname + ' ' + firstName + ' ' + lastName;
};

export const findUserById = (users, id) =>
  users && users.filter(user => user.id === id)[0];

export const findUsersByGroupId = (users, groupId) =>
  users && users.filter(user => user.studyGroupId === Number(groupId));

export const findAllStudentsWithoutGroup = users =>
  users &&
  users.filter(user => isStudent(user)).filter(user => !user.studyGroupId);

export const getTeachers = users =>
  users && users.filter(user => isTeacher(user));
