import moment from 'moment-timezone'
import { localizedDates, getOpenCloseStatus } from '../hours.js'
import { est, normalHours, endOfDayHours, endOfDayESTHours } from './constants'

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
