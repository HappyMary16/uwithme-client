import React from 'react';
import {
  ADD_LESSON,
  FILES,
  SCHEDULE,
  SETTING,
  STUDENTS,
  TEACHERS,
  USER_HOME
} from '../../constants/links';
import i18n from '../../locales/i18n';
import { isStudent, isTeacher } from '../../utils/UsersUtil';
import { slide as Menu } from 'react-burger-menu';

export const UserToolBar = ({ user, isOpen = false }) => {
  return (
    <Menu isOpen={isOpen}>
      <a href={USER_HOME}>{i18n.t('home_page')}</a>
      <a href={ADD_LESSON}>{i18n.t('add_lesson')}</a>
      <a href={SCHEDULE}>{i18n.t('schedule')}</a>
      <a href={FILES}>{i18n.t('page_with_files')}</a>
      {isStudent(user) && <a href={TEACHERS}>{i18n.t('teachers')}</a>}
      {isTeacher(user) && <a href={STUDENTS}>{i18n.t('students')}</a>}
      <a href={SETTING}>{i18n.t('setting')}</a>
    </Menu>
  );
};
