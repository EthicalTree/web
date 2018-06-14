import moment from 'moment-timezone'

const USER_TIMEZONE = moment.tz.guess()

export const getOpenCloseStatus = (hours, timezone) => {
  const tz = timezone ? timezone : USER_TIMEZONE
  const now = moment.tz(tz)

  const todaysHours = hours.filter(h => h.day === now.format('dddd').toLowerCase())

  const result = todaysHours.map(h => {
    const openTime = moment.tz(h.openStr, 'hh:mm a', tz)
    const closeTime = moment.tz(h.closeStr, 'hh:mm a', tz)

    if (closeTime < openTime) {
      closeTime.add(1, 'day')
    }

    const openingSoonTime = moment.tz(openTime, tz).add(-30, 'minutes')
    const closingSoonTime = moment.tz(closeTime, tz).add(-30, 'minutes')

    if (now.isBetween(openingSoonTime, openTime)) {
      return 'opening_soon'
    }
    else if (now.isBetween(closingSoonTime, closeTime)) {
      return 'closing_soon'
    }
    else if (now.isBetween(openTime, closeTime)) {
      return 'open'
    }

    return null
  }).filter(h => !!h)

  if (result.length > 0) {
    return result[0]
  }

  return 'closed'
}

