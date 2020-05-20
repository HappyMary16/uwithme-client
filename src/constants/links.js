//without authorization
export const SIGN_IN = '/sign-in';
export const SIGN_UP = '/sign-up';

//user
export const USER_HOME = '/home';
export const SCHEDULE = '/schedule';
export const FILES = '/files';
export const USER_SCHEDULE_ROUTER = '/user/schedule/:teacherId';
export const USER_SCHEDULE = teacherId => `/user/schedule/${teacherId}`;
export const USER_HOME_PAGE_ROUTER = '/user/:teacherId';
export const USER_HOME_PAGE = teacherId => `/user/${teacherId}`;

//student
export const TEACHERS = '/teachers/list';

//group
export const GROUP_SCHEDULE = groupId => `/group/schedule/${groupId}`;
export const GROUP_PAGE = groupId => `/group/${groupId}`;
export const GROUP_SCHEDULE_ROUTER = '/group/schedule/:groupId';
export const GROUP_PAGE_ROUTER = '/group/:groupId';

//teacher
export const ADD_FILE = '/files/add';
export const SHARE_FILES = '/files/share';
export const STUDENTS = '/students/list';

//admin
export const ADD_UNIVERSITY_PATH = '/university/add';
export const ADD_LESSON = '/lesson/add';
export const LECTURE_HALLS = '/lecture/halls';
