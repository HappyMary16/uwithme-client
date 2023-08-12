import {LESSONS_TIME} from '../constants/schedule';
import {getGroupById} from './StructureUtils';

export const getLessonTime = lessonNumber => {
  let lessonTime = LESSONS_TIME.find(lesson => lesson.value === lessonNumber);
  return lessonTime && lessonTime.label;
};

export const getTodayLessons = (lessons, weekNumber) => {
  let today = new Date().getDay();

  return (
    lessons &&
    lessons
      .filter(lesson => lesson.weekDay === today)
      .filter(lesson => lesson.weekNumber === weekNumber)
      .sort((lesson1, lesson2) => lesson1.lessonTime - lesson2.lessonTime)
  );
};

export const areLessonsToday = (lessons, weekNumber) => {
  let lessonsToday = getTodayLessons(lessons, weekNumber);
  return lessonsToday && lessonsToday.length !== 0;
};

export const getCurrentWeek = () => {
  //TODO fix it
  let now = new Date();
  let firstSeptember = new Date(now);
  firstSeptember.setFullYear(now.getFullYear(), 8, 1);

  return (
    (((now.getTime() - firstSeptember.getTime()) / 1000 / 60 / 60 / 24 / 7) %
      2) +
    1
  );
};

export const getLesson = (lessons, weekDay, lessonTime, weekNumber) => {
  let filteredLessons =
    Array.isArray(lessons) &&
    lessons.filter(lesson =>
      lessonFilter(lesson, weekDay, lessonTime, weekNumber)
    );

  if (Array.isArray(filteredLessons) && filteredLessons.length) {
    return filteredLessons[0];
  }
};

export const getLessons = (lessons, weekDay, weekNumber) => {
  return Array.isArray(lessons) &&
    lessons.filter(lesson =>
      lessonFilter(lesson, weekDay, null, weekNumber)
    );
};

let lessonFilter = (lesson, weekDay, lessonTime, weekNumber) => {
  if (lessonTime) {
    return (
      lesson.weekDay === weekDay &&
      lesson.lessonTime === lessonTime &&
      lesson.weekNumber === weekNumber
    );
  } else {
    return (
      lesson.weekDay === weekDay &&
      lesson.weekNumber === weekNumber
    );
  }
};

export const getGroupList = groups => {
  let result = '';
  if (Array.isArray(groups)) {
    for (let i = 0; i < groups.length - 1; i++) {
      result += groups[i] + ',';
    }
    return result + groups[groups.length - 1];
  }

  return '';
};

export const getLessonsByGroup = (lessons, groups, groupId) => {
  let groupName = getGroupById(groups, groupId).label;
  return (
    lessons &&
    groupId &&
    lessons.filter(lesson => lesson.groups && lesson.groups.includes(groupName))
  );
};
