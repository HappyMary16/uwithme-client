import { LESSONS_TIME } from '../constants/userRoles';

export const getLessonTime = (lessonNumber) => {
  let lessonTime = LESSONS_TIME.find(lesson => lesson.value === lessonNumber);
  return lessonTime && lessonTime.label;
};

export const filterAndSortLessons = (lessons, day, weekNumber) => {
  return lessons && lessons.filter(lesson => lesson.weekDay === day)
    .filter(lesson => lesson.weekNumber === weekNumber)
    .sort((lesson1, lesson2) => lesson1.lessonTime - lesson2.lessonTime);
};

export const areLessonsToday = (lessons, day) => {
  return lessons && lessons.filter(lesson => lesson.weekDay === day).length !== 0;
};

export const getCurrentWeek = () => {
  let now = new Date();
  let firstSeptember = new Date(now);
  firstSeptember.setFullYear(now.getFullYear(), 8, 1);

  return ((now.getTime() - firstSeptember.getTime()) / 1000 / 60 / 60 / 24 / 7 % 2) + 1;
};

export const getLesson = (lessons, weekDay, lessonTime, weekNumber) => {
  let filteredLessons = Array.isArray(lessons)
    && lessons.filter(lesson => lessonFilter(lesson, weekDay, lessonTime, weekNumber));

  if (Array.isArray(filteredLessons) && filteredLessons.length) {
    return filteredLessons[0];
  }
};

let lessonFilter = (lesson, weekDay, lessonTime, weekNumber) => {
  return lesson.weekDay === weekDay && lesson.lessonTime === lessonTime && lesson.weekNumber === weekNumber;
};

export const getGroupList = (groups) => {
  let result = '';
  if (Array.isArray(groups)) {
    for (let i = 0; i < groups.length - 1; i++) {
      result += groups[i] + ',';
    }
    return result + groups[groups.length - 1];
  }

  return '';
};