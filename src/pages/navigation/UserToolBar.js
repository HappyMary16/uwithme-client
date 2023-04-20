import React from 'react';
import {
  DEBTS,
  FILES_PAGE,
  SCHEDULE,
  SETTING,
  STUDENTS,
  STUDENTS_RATING,
  SUBJECT_SCORES,
  TEACHERS,
  USER_HOME
} from '../../constants/links';
import i18n from '../../locales/i18n';
import {slide as Menu} from 'react-burger-menu';
import {TEST_SYSTEM_URI} from '../../config';
import {useSelector} from "react-redux";
import {selectActiveRole} from "../../store/user/authSlice";
import {STUDENT, TEACHER} from "../../constants/userRoles";
import {Link} from "react-router-dom";

export function UserToolBar({ isOpen, onClose }) {

  const activeRole = useSelector(selectActiveRole);

  return (
    <Menu isOpen={isOpen} onClose={() => onClose()}>
      <Link to={USER_HOME}>{i18n.t('home_page')}</Link>
      <Link to={SCHEDULE}>{i18n.t('schedule')}</Link>
      <Link to={FILES_PAGE}>{i18n.t('page_with_files')}</Link>
      {activeRole === TEACHER && <Link to={TEST_SYSTEM_URI} target = "_blank" rel = "noopener noreferrer">{i18n.t('tests')}</Link>}
      {activeRole === STUDENT && <Link to={TEACHERS}>{i18n.t('teachers')}</Link>}
      {activeRole === TEACHER && <Link to={STUDENTS}>{i18n.t('students')}</Link>}
      {activeRole === STUDENT && <Link to={STUDENTS_RATING}>{i18n.t('students-rating')}</Link>}
      {activeRole === STUDENT && <Link to={SUBJECT_SCORES}>{i18n.t('subjects-scores')}</Link>}
      {activeRole === STUDENT && <Link to={DEBTS}>{i18n.t('debts')}</Link>}
      <Link to={SETTING}>{i18n.t('setting')}</Link>
    </Menu>
  );
}
