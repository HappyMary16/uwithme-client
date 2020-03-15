export const ADD_LESSON_TO_SCHEDULE = 'ADD_LESSON_TO_SCHEDULE';
export const FIND_LESSONS_BY_GROUP_ID = 'FIND_LESSONS_BY_GROUP_ID';
export const FIND_LESSONS_BY_USER_NAME = 'FIND_LESSONS_BY_USER_NAME';

export const RENDER_LESSONS = 'RENDER_LESSONS';

export const addLessonToSchedule = (subjectId,
                                    subjectName,
                                    teacherId,
                                    teacherName,
                                    lectureHall,
                                    groups,
                                    weekDay,
                                    lessonTime,
                                    weekNumber) => ({
  type: ADD_LESSON_TO_SCHEDULE,
  payload: {
    subjectId,
    subjectName,
    teacherId,
    teacherName,
    lectureHall,
    groups,
    weekDay,
    lessonTime,
    weekNumber
  }
});


export const findLessonsByGroupId = (groupId) => ({
  type: FIND_LESSONS_BY_GROUP_ID,
  payload: {
    groupId
  }
});

export const findLessonsByUsername = (username) => ({
  type: FIND_LESSONS_BY_USER_NAME,
  payload: {
    username
  }
});

export const renderLessons = (lessons) => ({
  type: RENDER_LESSONS,
  payload: {
    lessons
  }
});