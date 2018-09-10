export const est = 'America/Toronto'

export const normalHours = [
  {
    day: 'monday',
    open: '2000-01-01T13:00:00.000Z',
    close: '2000-01-01T21:00:00.000Z',
    openAt24Hour: '13:00',
    closedAt24Hour: '21:00',
  },
]

export const endOfDayHours = [
  {
    day: 'monday',
    open: '2000-01-01T22:00:00.000Z',
    close: '2000-01-01T02:00:00.000Z',
    openAt24Hour: '22:00',
    closedAt24Hour: '02:00',
  },
]

export const endOfDayESTHours = [
  {
    day: 'monday',
    open: '2000-01-01T02:00:00.000Z',
    close: '2000-01-01T006:00:00.000Z',
    openAt24Hour: '02:00', // 10pm EST
    closedAt24Hour: '04:00', // 12:00am EST
  },
]
