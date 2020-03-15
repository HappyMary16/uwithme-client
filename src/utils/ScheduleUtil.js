import { LESSONS_TIME } from '../constants/userRoles';

export const getLessonTime = (lessonNumber) => {
  let lessonTime = LESSONS_TIME.find(lesson => lesson.value === lessonNumber);
  return lessonTime && lessonTime.label;
};

export const filterAndSortLessons = (lessons, day) => {
  return lessons && lessons.filter(lesson => lesson.weekDay === day)
    .sort((lesson1, lesson2) => lesson1.value > lesson2.value);
};

export const areLessonsToday = (lessons, day) => {
  return lessons && lessons.filter(lesson => lesson.weekDay === day).length !== 0;
};