import { hasRole as hasOidcRole } from '../services/authService';
import { ADMIN, STUDENT, TEACHER } from '../constants/userRoles';

export const hasRole = (user, role) => user && user.roles && user.roles.filter(userRole => userRole === role)[0];

export const isStudent = user => user && user.activeRole === STUDENT;

export const isTeacher = user => user && user.activeRole === TEACHER;

export const isAdmin = user => user && user.activeRole === ADMIN;

export const getInactiveRoles = (user) => {
  let roles = [];

  if (hasOidcRole(STUDENT)
    && user.activeRole !== STUDENT) {
    roles.push(STUDENT);
  }
  if (hasOidcRole(TEACHER)
    && user.activeRole !== TEACHER) {
    roles.push(TEACHER);
  }
  if (hasOidcRole(ADMIN)
    && user.activeRole !== ADMIN) {
    roles.push(ADMIN);
  }

  return roles;
}

export const getDefaultActiveRole = () => {
  if (hasOidcRole(STUDENT)) {
    return STUDENT;
  }
  if (hasOidcRole(TEACHER)) {
    return TEACHER;
  }
  if (hasOidcRole(ADMIN)) {
    return ADMIN;
  }
}

export const getName = user => {
  if (!user) {
    return '';
  }

  const surname = !!user.surname ? user.surname : '';
  const firstName = typeof user.firstName === 'string' ? user.firstName : '';
  const middleName = typeof user.middleName === 'string' ? user.middleName : '';
  return surname + ' ' + firstName + ' ' + middleName;
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
  users.filter(user => hasRole(user, STUDENT)).filter(user => !user.studyGroupId);

export const getTeachers = users =>
  users && users.filter(user => hasRole(user, TEACHER));

export const getAdmins = users =>
  users && users.filter(user => hasRole(user, ADMIN));

export const getStudents = users =>
  users && users.filter(user => hasRole(user, STUDENT));
