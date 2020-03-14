export const ADD_LESSON_TO_SCHEDULE = 'ADD_LESSON_TO_SCHEDULE';

export function addLessonToSchedule(subjectId,
                                    subjectName,
                                    teacherId,
                                    teacherName,
                                    lectureHall,
                                    groups,
                                    weekDay,
                                    lessonTime,
                                    weekNumber) {
  return {
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
  };
}