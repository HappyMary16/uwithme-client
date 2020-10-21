export const ADD_LESSON_TO_SCHEDULE = 'ADD_LESSON_TO_SCHEDULE';

export const addLessonToSchedule = (subjectId,
                                    subjectName,
                                    teacherId,
                                    teacherName,
                                    lectureHall,
                                    groups,
                                    weekDays,
                                    lessonTimes,
                                    weekNumbers) => ({
  type: ADD_LESSON_TO_SCHEDULE,
  payload: {
    subjectId,
    subjectName,
    teacherId,
    teacherName,
    lectureHall,
    groups,
    weekDays,
    lessonTimes,
    weekNumbers
  }
});