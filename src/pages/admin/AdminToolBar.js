import React from 'react';
import {
  ADD_LESSON,
  LECTURE_HALLS,
  SCHEDULE, SETTING, STUDENTS, TEACHERS,
  USER_HOME
} from '../../constants/links';
import i18n from '../../locales/i18n';
import { slide as Menu } from 'react-burger-menu';

export const AdminToolBar = ({ isOpen = false, onClose }) => {
  return (
    <Menu isOpen={isOpen} onClose={() => onClose()}>
      <a href={USER_HOME}>{i18n.t('university_structure')}</a>
      <a href={LECTURE_HALLS}>{i18n.t('lecture_halls')}</a>
      <a href={ADD_LESSON}>{i18n.t('add_lesson')}</a>
      <a href={SCHEDULE}>{i18n.t('schedule')}</a>
      <a href={TEACHERS}>{i18n.t('teachers')}</a>
      <a href={STUDENTS}>{i18n.t('students')}</a>
      <a href={SETTING}>{i18n.t('setting')}</a>
    </Menu>
  );
};
