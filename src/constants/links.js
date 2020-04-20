//without authorization
export const SIGN_IN = '/sign-in';
export const SIGN_UP = '/sign-up';

//user
export const USER_HOME = '/home';
export const SCHEDULE = '/schedule';
export const FILES = '/files';

//student
export const TEACHERS = '/teachers/list';
export const TEACHER_SCHEDULE_ROUTER = '/teacher/schedule/:id';
export const TEACHER_SCHEDULE = teacherId => `/teacher/schedule/${teacherId}`;
export const TEACHER_HOME_PAGE_ROUTER = '/teacher/:teacherId';
export const TEACHER_HOME_PAGE = teacherId => `/teacher/${teacherId}`;

//teacher
export const ADD_FILE = '/files/add';
export const SHARE_FILES = '/files/share';

//admin
export const ADD_UNIVERSITY_PATH = '/university/add';
export const ADD_LESSON = '/lesson/add';
export const LECTURE_HALLS = '/lecture/halls';
