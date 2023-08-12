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
import {slide as Menu} from 'react-burger-menu';
import {TEST_SYSTEM_URI} from '../../config';
import {useSelector} from "react-redux";
import {selectActiveRole} from "../../store/user/authSlice";
import {STUDENT, TEACHER} from "../../constants/userRoles";
import {useTranslation} from "react-i18next";

export function UserToolBar({isOpen, onClose}) {

  const {t} = useTranslation("menu");
  const activeRole = useSelector(selectActiveRole);

  return (
    <Menu isOpen={isOpen} onClose={onClose}>
      <a href={USER_HOME}>{t('home_page')}</a>
      <a href={SCHEDULE}>{t('schedule')}</a>
      <a href={FILES_PAGE}>{t('page_with_files')}</a>
      {activeRole === TEACHER && <a href={TEST_SYSTEM_URI} rel="noopener noreferrer">{t('tests')}</a>}
      {activeRole === STUDENT && <a href={TEACHERS}>{t('teachers')}</a>}
      {activeRole === TEACHER && <a href={STUDENTS}>{t('students')}</a>}
      {activeRole === STUDENT && <a href={STUDENTS_RATING}>{t('students_rating')}</a>}
      {activeRole === STUDENT && <a href={SUBJECT_SCORES}>{t('subjects_scores')}</a>}
      {activeRole === STUDENT && <a href={SYLLABUS}>{t('syllabus')}</a>}
      {activeRole === STUDENT && <a href={DEBTS}>{t('debts')}</a>}
      <a href={SETTING}>{t('setting')}</a>
    </Menu>
  );
}
