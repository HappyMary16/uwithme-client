export const FIND_LESSONS_BY_GROUP_ID = 'FIND_LESSONS_BY_GROUP_ID';
export const FIND_LESSONS_BY_USER_NAME = 'FIND_LESSONS_BY_USER_NAME';

export const RENDER_LESSONS = 'RENDER_LESSONS';

export const DELETE_LESSON = 'DELETE_LESSON';

export const findLessonsByGroupId = (groupId) => ({
  type: FIND_LESSONS_BY_GROUP_ID,
  payload: {
    groupId
  }
});

export const findLessons = () => ({
  type: FIND_LESSONS_BY_USER_NAME
});

export const renderLessons = (lessons) => ({
  type: RENDER_LESSONS,
  payload: {
    lessons
  }
});

export const deleteLesson = (lesson, groups) => ({
  type: DELETE_LESSON,
  payload: {
    lesson,
    groups
  }
});