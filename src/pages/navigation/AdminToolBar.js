import React from 'react';
import {ADMINS, LECTURE_HALLS, SCHEDULE, SETTING, STUDENTS, TEACHERS, USER_HOME} from '../../constants/links';
import i18n from '../../locales/i18n';
import {slide as Menu} from 'react-burger-menu';
import {Link} from "react-router-dom";

export function AdminToolBar({isOpen = false, onClose}) {
  return (
    <Menu isOpen={isOpen} onClose={() => onClose()}>
      <Link to={USER_HOME}>{i18n.t('university_structure')}</Link>
      <Link to={LECTURE_HALLS}>{i18n.t('lecture_halls')}</Link>
      <Link to={SCHEDULE}>{i18n.t('schedule')}</Link>
      <Link to={TEACHERS}>{i18n.t('teachers')}</Link>
      <Link to={STUDENTS}>{i18n.t('students')}</Link>
      <Link to={ADMINS}>{i18n.t('admins')}</Link>
      <Link to={SETTING}>{i18n.t('setting')}</Link>
    </Menu>
  );
}
