import {ADMINS, LECTURE_HALLS, SCHEDULE, SETTING, STUDENTS, TEACHERS, USER_HOME} from '../../constants/links';
import {slide as Menu} from 'react-burger-menu';
import {useTranslation} from "react-i18next";

export function AdminToolBar({isOpen = false, onClose}) {

  const {t} = useTranslation("menu");

  return (
    <Menu isOpen={isOpen} onClose={() => onClose()}>
      <a href={USER_HOME}>{t('university_structure')}</a>
      <a href={LECTURE_HALLS}>{t('lecture_halls')}</a>
      <a href={SCHEDULE}>{t('schedule')}</a>
      <a href={TEACHERS}>{t('teachers')}</a>
      <a href={STUDENTS}>{t('students')}</a>
      <a href={ADMINS}>{t('admins')}</a>
      <a href={SETTING}>{t('setting')}</a>
    </Menu>
  );
}
