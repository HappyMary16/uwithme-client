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

export function getLocalizedWeekDays(t) {
  return [{
    value: 1,
    label: t('monday')
  },
    {
      value: 2,
      label: t('tuesday')
    },
    {
      value: 3,
      label: t('wednesday')
    },
    {
      value: 4,
      label: t('thursday')
    },
    {
      value: 5,
      label: t('friday')
    }
  ];
}

export function getLocalizedWeekNumber(t) {
  return [
    {
      value: 1,
      label: t('first_week')
    },
    {
      value: 2,
      label: t('second_week')
    }
  ];
}
