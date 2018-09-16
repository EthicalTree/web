import moment from 'moment-timezone'
import { localizedDates, getOpenCloseStatus } from '../hours.js'

describe('test that operating hours convenience functions return as expected', () => {
  test('localizedDates basic', () => {
    const localized = localizedDates(normalHours, est)

    expect(localized[0].day).toEqual('monday')
    expect(localized[0].open.format('HH:mm')).toEqual('09:00')
    expect(localized[0].close.format('HH:mm')).toEqual('17:00')
  })

  test('localizedDates end of day', () => {
    const localized = localizedDates(endOfDayHours, est)

    expect(localized[0].open.format('HH:mm')).toEqual('18:00')
    expect(localized[0].close.format('HH:mm')).toEqual('22:00')
  })

  test('getOpenCloseStatus normal open', () => {
    const localizedHours = localizedDates(normalHours, est)
    const now = moment.tz('2018-09-10T10:00:00', est) // 10:00 am

    const openCloseStatus = getOpenCloseStatus(localizedHours, est, now)

    expect(openCloseStatus).toEqual('open')
  })

  test('getOpenCloseStatus normal closed', () => {
    const localizedHours = localizedDates(normalHours, est)
    const now = moment.tz('2018-09-10T02:00:00', est) // 02:00 am

    const openCloseStatus = getOpenCloseStatus(localizedHours, est, now)

    expect(openCloseStatus).toEqual('closed')
  })

  test('getOpenCloseStatus normal opening soon', () => {
    const localizedHours = localizedDates(normalHours, est)
    const now = moment.tz('2018-09-10T08:31:00', est) // 8:31 am

    const openCloseStatus = getOpenCloseStatus(localizedHours, est, now)

    expect(openCloseStatus).toEqual('opening_soon')
  })

  test('getOpenCloseStatus normal closing soon', () => {
    const localizedHours = localizedDates(normalHours, est)
    const now = moment.tz('2018-09-10T16:31:00', est) // 4:31 pm

    const openCloseStatus = getOpenCloseStatus(localizedHours, est, now)

    expect(openCloseStatus).toEqual('closing_soon')
  })

  test('getOpenCloseStatus end of day', () => {
    const localizedHours = localizedDates(endOfDayESTHours, est)
    const now = moment.tz('2018-09-10T23:59:00', est) // 11:59 pm

    const openCloseStatus = getOpenCloseStatus(localizedHours, est, now)

    expect(openCloseStatus).toEqual('closing_soon')
  })
})

/*
 * constants
 */
const est = 'America/Toronto'

const normalHours = [
  {
    day: 'monday',
    open: '2000-01-01T13:00:00.000Z',
    close: '2000-01-01T21:00:00.000Z',
    openAt24Hour: '13:00',
    closedAt24Hour: '21:00',
  },
]

const endOfDayHours = [
  {
    day: 'monday',
    open: '2000-01-01T22:00:00.000Z',
    close: '2000-01-01T02:00:00.000Z',
    openAt24Hour: '22:00',
    closedAt24Hour: '02:00',
  },
]

const endOfDayESTHours = [
  {
    day: 'monday',
    open: '2000-01-01T02:00:00.000Z',
    close: '2000-01-01T006:00:00.000Z',
    openAt24Hour: '02:00', // 10pm EST
    closedAt24Hour: '04:00', // 12:00am EST
  },
]
