import moment from 'moment-timezone'
import { localizedDates, getOpenCloseStatus } from '../hours.js'

describe('test that operating hours convenience functions return as expected', () => {
  test('localizedDates basic', () => {
    const localized = localizedDates(normalHours, EST)

    expect(localized[0].day).toEqual('monday')
    expect(localized[0].open.format('HH:mm')).toEqual('09:00')
    expect(localized[0].close.format('HH:mm')).toEqual('17:00')
  })

  test('localizedDates end of day', () => {
    const localized = localizedDates(endOfDayHours, EST)

    expect(localized[0].open.format('HH:mm')).toEqual('22:00')
    expect(localized[0].close.format('HH:mm')).toEqual('02:00')
  })

  test('getOpenCloseStatus normal open', () => {
    const localizedHours = localizedDates(normalHours, EST)
    const now = moment.tz('2018-09-10T10:00:00', EST) // 10:00 am

    const openCloseStatus = getOpenCloseStatus(localizedHours, EST, now)

    expect(openCloseStatus).toEqual('open')
  })

  test('getOpenCloseStatus normal closed', () => {
    const localizedHours = localizedDates(normalHours, EST)
    const now = moment.tz('2018-09-10T02:00:00', EST) // 02:00 am

    const openCloseStatus = getOpenCloseStatus(localizedHours, EST, now)

    expect(openCloseStatus).toEqual('closed')
  })

  test('getOpenCloseStatus normal opening soon', () => {
    const localizedHours = localizedDates(normalHours, EST)
    const now = moment.tz('2018-09-10T08:31:00', EST) // 8:31 am

    const openCloseStatus = getOpenCloseStatus(localizedHours, EST, now)

    expect(openCloseStatus).toEqual('opening_soon')
  })

  test('getOpenCloseStatus normal closing soon', () => {
    const localizedHours = localizedDates(normalHours, EST)
    const now = moment.tz('2018-09-10T16:31:00', EST) // 4:31 pm

    const openCloseStatus = getOpenCloseStatus(localizedHours, EST, now)

    expect(openCloseStatus).toEqual('closing_soon')
  })
})

/*
 * constants
 */
const EST = 'America/Toronto'

const normalHours = [
  {
    day: 'monday',
    openAt24Hour: '09:00',
    closedAt24Hour: '17:00',
  },
]

const endOfDayHours = [
  {
    day: 'monday',
    openAt24Hour: '22:00',
    closedAt24Hour: '02:00',
  },
]
