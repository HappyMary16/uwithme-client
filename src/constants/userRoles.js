import i18n from '../locales/i18n';

export const UserRoles = [
  {
    value: 1,
    label: i18n.t('student')
  },
  {
    value: 2,
    label: i18n.t('teacher')
  }
];

export const FileTypes = [
  {
    value: 1,
    label: i18n.t('lecture')
  },
  {
    value: 2,
    label: i18n.t('task')
  }
];

export const LECTURE = 1;
export const TASK = 2;

export const STUDENT = 1;
export const TEACHER = 2;
export const ADMIN = 3;

export const WEEK_DAYS = [
  {
    value: 1,
    label: i18n.t('monday')
  },
  {
    value: 2,
    label: i18n.t('tuesday')
  },
  {
    value: 3,
    label: i18n.t('wednesday')
  },
  {
    value: 4,
    label: i18n.t('thursday')
  },
  {
    value: 5,
    label: i18n.t('friday')
  }
];

export const LESSONS_TIME = [
  {
    value: 1,
    start: '8:30',
    end: '10:05'
  },
  {
    value: 2,
    start: '10:25',
    end: '12:00'
  },
  {
    value: 3,
    start: '12:35',
    end: '14:10'
  },
  {
    value: 4,
    start: '14:30',
    end: '16:05'
  },
  {
    value: 5,
    start: '16:25',
    end: '18:00'
  }
];

export const WEEK_NUMBER = [
  {
    value: 1,
    label: i18n.t('first_week')
  },
  {
    value: 2,
    label: i18n.t('second_week')
  }
];

export const COURSE_NUMBER = [
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
  },
  {
    value: 4,
    label: '4'
  },
  {
    value: 5,
    label: '5'
  },
  {
    value: 6,
    label: '6'
  }
];