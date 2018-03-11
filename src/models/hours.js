import moment from 'moment-timezone'

export const localizedDates = operatingHours => {
  return operatingHours.map(oh => {
    let result = {
      openStr: moment.utc(oh.openStr, 'hh:mm a').local().format('hh:mm a'),
      closeStr: moment.utc(oh.closeStr, 'hh:mm a').local().format('hh:mm a'),
    }
    result.hours = `${result.openStr} - ${result.closeStr}`
    return {...oh, ...result}
  })
}
