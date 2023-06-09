import React from 'react';
import {
  DEBTS,
  FILES_PAGE,
  SCHEDULE,
  SETTING,
  STUDENTS,
  STUDENTS_RATING,
  SUBJECT_SCORES,
  SYLLABUS,
  TEACHERS,
  USER_HOME
} from '../../constants/links';
import i18n from '../../config/i18n';
import {slide as Menu} from 'react-burger-menu';
import {TEST_SYSTEM_URI} from '../../config';
import {useSelector} from "react-redux";
import {selectActiveRole} from "../../store/user/authSlice";
import {STUDENT, TEACHER} from "../../constants/userRoles";

export function UserToolBar({isOpen, onClose}) {

  const activeRole = useSelector(selectActiveRole);

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <a href={USER_HOME}>{i18n.t('home_page')}</a>
      <a href={SCHEDULE}>{i18n.t('schedule')}</a>
      <a href={FILES_PAGE}>{i18n.t('page_with_files')}</a>
      {activeRole === TEACHER &&
        <a href={TEST_SYSTEM_URI} target="_blank" rel="noopener noreferrer">{i18n.t('tests')}</a>}
      {activeRole === STUDENT && <a href={TEACHERS}>{i18n.t('teachers')}</a>}
      {activeRole === TEACHER && <a href={STUDENTS}>{i18n.t('students')}</a>}
      {activeRole === STUDENT && <a href={STUDENTS_RATING}>{i18n.t('students_rating')}</a>}
      {activeRole === STUDENT && <a href={SUBJECT_SCORES}>{i18n.t('subjects_scores')}</a>}
      {activeRole === STUDENT && <a href={SYLLABUS}>{i18n.t('syllabus')}</a>}
      {activeRole === STUDENT && <a href={DEBTS}>{i18n.t('debts')}</a>}
      <a href={SETTING}>{i18n.t('setting')}</a>
    </Menu>
  );
}
