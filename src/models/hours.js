import moment from 'moment-timezone'

// get minuts from the moment datetime
const minutesOfDay = m => {
  return m.minutes() + m.hours() * 60
}

// pass in three moment datetimes and return whether or not
// the middle time is in between the two times regardless of date
const isBetween = (start, test, stop) => {
  const s1 = minutesOfDay(start)
  const s2 = minutesOfDay(stop)
  const t = minutesOfDay(test)

  if (t >= s1 && t <= s2) {
    return true
  } else if (s2 < s1 && t >= s1) {
    // if the end time is less than the start, as long as it's
    // past the start, then it's open
    return true
  }
  return false
}

export const localizedDates = (operatingHours, timezone) => {
  return operatingHours.map(oh => {
    const open = moment.tz(oh.openAt24Hour, 'HH:mm', timezone).day(oh.day)
    const close = moment.tz(oh.closedAt24Hour, 'HH:mm', timezone).day(oh.day)
    let result = { open, close }
    return { ...oh, ...result }
  })
}

export const getOpenCloseStatus = (hours, timezone, now) => {
  hours = localizedDates(hours, timezone)
  now = now || moment.tz(timezone)

  const result = hours
    .map(h => {
      const openTime = h.open.clone()
      const closeTime = h.close.clone()

      if (closeTime < openTime) {
        closeTime.add(1, 'day')
      }

      const openingSoonTime = openTime.clone().add(-30, 'minutes')
      const closingSoonTime = closeTime.clone().add(-30, 'minutes')

      if (openTime.day() === now.day() || closeTime.day() === now.day()) {
        if (isBetween(openingSoonTime, now, openTime)) {
          return 'opening_soon'
        } else if (isBetween(closingSoonTime, now, closeTime)) {
          return 'closing_soon'
        } else if (isBetween(openTime, now, closeTime)) {
          return 'open'
        }
      }

      return null
    })
    .filter(h => !!h)

  if (result.length > 0) {
    return result[0]
  }

  return 'closed'
}
