import { ADMIN, STUDENT, TEACHER } from '../constants/userRoles';

export const isStudent = user => user && user.role === STUDENT && !user.isAdmin;

export const isTeacher = user => user && user.role === TEACHER && !user.isAdmin;

export const isAdmin = user => user && (user.role === ADMIN || user.isAdmin);

export const getName = user => user && user.lastName + ' ' + user.firstName + ' ' + user.surname;

export const findUserById = (users, id) => users && users.filter(user => user.id === Number(id))[0];
