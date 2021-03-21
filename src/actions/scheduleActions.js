export const FIND_LESSONS_BY_GROUP_ID = 'FIND_LESSONS_BY_GROUP_ID';
export const FIND_LESSONS_BY_USER_NAME = 'FIND_LESSONS_BY_USER_NAME';
export const RENDER_LESSONS = 'RENDER_LESSONS';
export const RENDER_LESSON = 'RENDER_LESSON';

export const RENDER_LESSONS_FOR_CURRENT_USER_PAGE =
  'RENDER_LESSONS_FOR_CURRENT_USER_PAGE';
export const FIND_LESSONS_FOR_USER = 'FIND_LESSONS_FOR_USER';

export const findLessonsForUser = id => ({
  type: FIND_LESSONS_FOR_USER,
  payload: {
    id
  }
});

export const renderLessonsForUser = lessons => ({
  type: RENDER_LESSONS_FOR_CURRENT_USER_PAGE,
  payload: {
    lessons
  }
});

export const findLessonsByGroupId = groupId => ({
  type: FIND_LESSONS_BY_GROUP_ID,
  payload: {
    groupId
  }
});

export const findLessons = () => ({
  type: FIND_LESSONS_BY_USER_NAME
});

export const renderLessons = lessons => ({
  type: RENDER_LESSONS,
  payload: {
    lessons
  }
});

export const renderLesson = (lessonId, newLesson) => ({
  type: RENDER_LESSON,
  payload: {
    lessonId,
    newLesson
  }
});
