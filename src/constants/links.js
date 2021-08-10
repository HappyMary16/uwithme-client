//user
export const PRE_HOME = "/";
export const USER_HOME = "/home";
export const SCHEDULE = "/schedule";
export const FILES = "/files";
export const USER_SCHEDULE_ROUTER = "/user/schedule/:userId";
export const USER_SCHEDULE = userId => `/user/schedule/${userId}`;
export const USER_HOME_PAGE_ROUTER = "/user/:userId";
export const USER_HOME_PAGE = teacherId => `/user/${teacherId}`;
export const SETTING = "/setting";

//student
export const TEACHERS = "/teachers/list";

//groupPage
export const GROUP_SCHEDULE = groupId => `/group/schedule/${groupId}`;
export const GROUP_PAGE = groupId => `/group/${groupId}`;
export const GROUP_SCHEDULE_ROUTER = "/group/schedule/:groupId";
export const GROUP_PAGE_ROUTER = "/group/:groupId";

//teacher
export const ADD_FILE = "/files/add";
export const SHARE_FILES = "/files/share";
export const STUDENTS = "/students/list";

//admin
export const ADD_LESSON = "/lesson/add";
export const LECTURE_HALLS = "/lecture/halls";

//stud cabinet
export const STUDENTS_RATING = "/studcab/students/rating";
export const SUBJECT_SCORES = "/studcab/subjects/scores";
export const DEBTS = "/studcab/students/debts";
