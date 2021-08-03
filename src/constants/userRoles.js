import i18n from '../locales/i18n';

export const UserRoles = [
  {
    value: 1,
    label: i18n.t('student')
  },
  {
    value: 2,
    label: i18n.t('continue_like_teacher')
  },
  {
    value: 3,
    label: i18n.t('add_university')
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
    label: '8:30-10:05',
    start: '8:30',
    end: '10:05'
  },
  {
    value: 2,
    label: '10:25-12:00',
    start: '10:25',
    end: '12:00'
  },
  {
    value: 3,
    label: '12:35-14:10',
    start: '12:35',
    end: '14:10'
  },
  {
    value: 4,
    label: '14:30-16:05',
    start: '14:30',
    end: '16:05'
  },
  {
    value: 5,
    label: '16:25-18:00',
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
    label: '5 (1)'
  },
  {
    value: 6,
    label: '6 (2)'
  }
];

export const SEMESTER_NUMBER = [
  {
    value: 1,
    label: '1 семестр (1 курс)'
  },
  {
    value: 2,
    label: '2 семестр (1 курс)'
  },
  {
    value: 3,
    label: '3 семестр (2 курс)'
  },
  {
    value: 4,
    label: '4 семестр (2 курс)'
  },
  {
    value: 5,
    label: '5 семестр (3 курс)'
  },
  {
    value: 6,
    label: '6 семестр (3 курс)'
  },
  {
    value: 7,
    label: '7 семестр (4 курс)'
  },
  {
    value: 8,
    label: '8 семестр (4 курс)'
  },
  {
    value: 9,
    label: '9 семестр (5 курс)'
  },
  {
    value: 10,
    label: '10 семестр (5 курс)'
  },
  {
    value: 11,
    label: '11 семестр (6 курс)'
  },
  {
    value: 12,
    label: '12 семестр (6 курс)'
  }
];
