import { authService } from '../services/http';
import { ADMIN, STUDENT, TEACHER } from '../constants/userRoles';

export const isStudent = user => user && user.activeRole === STUDENT;

export const isTeacher = user => user && user.activeRole === TEACHER;

export const isAdmin = user => user && user.activeRole === ADMIN;

export const getUserRoles = (user) => {
  let roles = [];

  if (authService.hasRole(STUDENT) || user.role === STUDENT) {
    roles.push(STUDENT);
  }
  if (authService.hasRole(TEACHER) || user.role === TEACHER) {
    roles.push(TEACHER);
  }
  if (authService.hasRole(ADMIN) || user.isAdmin) {
    roles.push(ADMIN);
  }

  return roles;
}

export const getInactiveRoles = (user) => {
  let roles = [];

  if ((authService.hasRole(STUDENT) || user.role === STUDENT)
    && user.activeRole !== STUDENT) {
    roles.push(STUDENT);
  }
  if ((authService.hasRole(TEACHER) || user.role === TEACHER)
    && user.activeRole !== TEACHER) {
    roles.push(TEACHER);
  }
  if ((authService.hasRole(ADMIN) || user.isAdmin)
    && user.activeRole !== ADMIN) {
    roles.push(ADMIN);
  }

  return roles;
}


export const getDefaultActiveRole = () => {
  if (authService.hasRole(STUDENT)) {
    return STUDENT;
  }
  if (authService.hasRole(TEACHER)) {
    return TEACHER;
  }
  if (authService.hasRole(ADMIN)) {
    return ADMIN;
  }
}

export const getName = user => {
  if (!user) {
    return '';
  }

  const surname = !!user.surname ? user.surname : '';
  const firstName = typeof user.firstName === 'string' ? user.firstName : '';
  const lastName = typeof user.lastName === 'string' ? user.lastName : '';
  return surname + ' ' + firstName + ' ' + lastName;
};

export const getUserGroup = user => {
  if (!user) {
    return '';
  }

  return typeof user.studyGroupName === 'string' ? user.studyGroupName : '';
};

export const findUserById = (users, id) =>
  users && users.filter(user => user.id === id)[0];

export const findUsersByGroupId = (users, groupId) =>
  users && users.filter(user => user.studyGroupId === Number(groupId));

export const findAllStudentsWithoutGroup = users =>
  users &&
  users.filter(user => user.role === STUDENT).filter(user => !user.studyGroupId);

export const getTeachers = users =>
  users && users.filter(user => user && user.role === TEACHER);

export const getAdmins = users =>
  users && users.filter(user => user && user.isAdmin);

export const getStudents = users =>
  users && users.filter(user => user && user.role === STUDENT);
