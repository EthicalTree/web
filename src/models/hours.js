import moment from 'moment-timezone'

const USER_TIMEZONE = moment.tz.guess()

export const asToday = datetime => {
  return moment.utc({
    hour: datetime.hour(),
    minute: datetime.minute()
  })
}

export const localizedDates = (operatingHours, timezone) => {
  const tz = timezone ? timezone : USER_TIMEZONE

  return operatingHours.map(oh => {
    const open = asToday(moment.utc(oh.open))
    const close = asToday(moment.utc(oh.close))

    let result = {
      openStr: open.tz(tz).format('hh:mm a'),
      closeStr: close.tz(tz).format('hh:mm a'),
    }

    result.hours = `${result.openStr} - ${result.closeStr}`
    return {...oh, ...result}
  })
}
