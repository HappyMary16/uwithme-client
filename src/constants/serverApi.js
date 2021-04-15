import config from '../config';

export const apiRoot = `${config.url}/api/`;

const USER = 'user/';
const INFO = 'info/';
const AUTH = 'auth/';

export const SIGN_IN = AUTH + 'signIn';
export const SIGN_UP = AUTH + 'signUp';

export const GET_BUILDINGS = 'buildings/';

export const DEPARTMENTS = 'departments/';
export const INFO_DEPARTMENTS = INFO + DEPARTMENTS;
export const USER_DEPARTMENT = DEPARTMENTS + USER;

export const FILES = 'files/';
export const FILES_ACCESS = FILES + 'access/';
export const AVATAR = FILES + 'avatar/';

export const GROUPS = 'groups/';
export const GROUPS_BY_UNIVERSITY_ID = GROUPS + 'universityId/';
export const INFO_GROUPS = INFO + GROUPS;
export const USER_GROUP = GROUPS + USER;

export const INSTITUTES = 'institutes/';
export const INFO_INSTITUTES = INFO + INSTITUTES;
export const USER_INSTITUTE = INSTITUTES + USER;

export const LECTURE_HALLS = 'lectureHalls/';

export const LESSONS = 'lessons/';
export const GET_LESSONS_BY_GROUP_ID = LESSONS + 'group/';
export const LESSONS_BY_USERNAME = LESSONS + 'username/';

export const SUBJECTS = 'subjects/';

export const UNIVERSITIES = 'universities/';
export const INFO_UNIVERSITIES = INFO + UNIVERSITIES;

export const USERS = 'users/';
export const TEACHERS = USERS + 'teachers/';
export const STUDENTS = USERS + 'students/';
export const STUDENTS_BY_GROUP_ID = STUDENTS + 'groupId/';
export const GROUP_STUDENT_ID = USERS + 'group/studentId/';
export const STUDENTS_WITHOUT_GROUP = STUDENTS + 'without/group/';
export const STUDENT_GROUP = USERS + 'group';
