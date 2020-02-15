import i18n from '../../locales/i18n';

export const UserRoles = [
  {
    value: '1',
    label: i18n.t('student')
  },
  {
    value: '2',
    label: i18n.t('teacher')
  }
];

export const FileTypes = [
  {
    value: '1',
    label: i18n.t('lecture')
  },
  {
    value: '2',
    label: i18n.t('task')
  }
];

export const LECTURE = 1;
export const TASK = 2;

export const STUDENT = 1;
export const TEACHER = 2;
