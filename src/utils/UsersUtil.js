import { ADMIN, STUDENT, TEACHER } from '../constants/userRoles';

export const isStudent = user => user.role === STUDENT && !user.isAdmin;

export const isTeacher = user => user.role === TEACHER && !user.isAdmin;

export const isAdmin = user => user.role === ADMIN || user.isAdmin;

export const getName = user => user.lastName + ' ' + user.firstName + ' ' + user.surname;
