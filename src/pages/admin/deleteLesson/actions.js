export const DELETE_LESSON = 'DELETE_LESSON';

export const deleteLesson = (lesson, groups) => ({
  type: DELETE_LESSON,
  payload: {
    lesson,
    groups
  }
});