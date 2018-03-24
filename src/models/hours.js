import moment from 'moment-timezone'

export const localizedDates = operatingHours => {
  return operatingHours.map(oh => {
    let result = {
      openStr: moment.utc(oh.open).local().format('hh:mm a'),
      closeStr: moment.utc(oh.close).local().format('hh:mm a'),
    }

    result.hours = `${result.openStr} - ${result.closeStr}`
    return {...oh, ...result}
  })
}
