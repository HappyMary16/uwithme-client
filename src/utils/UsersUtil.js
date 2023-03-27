import {ADMIN, STUDENT, TEACHER} from '../constants/userRoles';

export const hasRole = (user, role) => user?.roles?.includes(role);

export const getName = user => {
  if (!user) {
    return '';
  }

  const surname = !!user.surname ? user.surname : '';
  const firstName = typeof user.firstName === 'string' ? user.firstName : '';
  const middleName = typeof user.middleName === 'string' ? user.middleName : '';
  return surname + ' ' + firstName + ' ' + middleName;
};

export const findUserById = (users, id) =>
  users && users[id];

export const findUsersByGroupId = (users, groupId) =>
  users && users.filter(user => user.group?.id === Number(groupId));

export const findAllStudentsWithoutGroup = users =>
  users &&
  users.filter(user => hasRole(user, STUDENT)).filter(user => !user.group);

export const getTeachers = users =>
  users && users.filter(user => hasRole(user, TEACHER));

export const getAdmins = users =>
  users && users.filter(user => hasRole(user, ADMIN));

export const getStudents = users =>
  users && users.filter(user => hasRole(user, STUDENT));
