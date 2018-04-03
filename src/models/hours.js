import moment from 'moment-timezone'

const USER_TIMEZONE = moment.tz.guess()

export const asToday = datetime => {
  return moment.utc({
    hour: datetime.hour(),
    minute: datetime.minute()
  })
}

export const localizedDates = operatingHours => {
  return operatingHours.map(oh => {
    const open = asToday(moment.utc(oh.open))
    const close = asToday(moment.utc(oh.close))

    let result = {
      openStr: open.tz(USER_TIMEZONE).format('hh:mm a'),
      closeStr: close.tz(USER_TIMEZONE).format('hh:mm a'),
    }

    result.hours = `${result.openStr} - ${result.closeStr}`
    return {...oh, ...result}
  })
}
