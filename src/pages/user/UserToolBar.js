import React from 'react';
import {
  ADD_LESSON,
  DEBTS,
  FILES,
  SCHEDULE,
  SETTING,
  STUDENTS,
  STUDENTS_RATING,
  SUBJECT_SCORES,
  TEACHERS,
  USER_HOME
} from '../../constants/links';
import i18n from '../../locales/i18n';
import { isStudent, isTeacher } from '../../utils/UsersUtil';
import { slide as Menu } from 'react-burger-menu';

export const UserToolBar = ({ user, isOpen = false, onClose}) => {
  return (
    <Menu isOpen={isOpen} onClose={() => onClose()}>
      <a href={USER_HOME}>{i18n.t('home_page')}</a>
      <a href={SCHEDULE}>{i18n.t('schedule')}</a>
      {isTeacher(user) && <a href={ADD_LESSON}>{i18n.t('add_lesson')}</a>}
      <a href={FILES}>{i18n.t('page_with_files')}</a>
      {isStudent(user) && <a href={TEACHERS}>{i18n.t('teachers')}</a>}
      {isTeacher(user) && <a href={STUDENTS}>{i18n.t('students')}</a>}
      {isStudent(user) && (
        <a href={STUDENTS_RATING}>{i18n.t('students-rating')}</a>
      )}
      {isStudent(user) && (
        <a href={SUBJECT_SCORES}>{i18n.t('subjects-scores')}</a>
      )}
      {isStudent(user) && <a href={DEBTS}>{i18n.t('debts')}</a>}
      <a href={SETTING}>{i18n.t('setting')}</a>
    </Menu>
  );
};
