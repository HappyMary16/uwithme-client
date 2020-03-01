import { ADMIN, STUDENT, TEACHER } from '../constants/userRoles';

export const isStudent = user => user.role === STUDENT && !user.showAdmin;

export const isTeacher = user => user.role === TEACHER && !user.showAdmin;

export const isAdmin = user => user.role === ADMIN || user.showAdmin;
