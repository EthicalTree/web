import moment from 'moment-timezone'

export const localizedDates = (operatingHours, timezone) => {
  return operatingHours.map(oh => {
    const open = moment.tz(oh.openAt24Hour, 'HH:mm', 'UTC').tz(timezone)
    const close = moment.tz(oh.closedAt24Hour, 'HH:mm', 'UTC').tz(timezone)
    let result = { open, close }

    result.hours = `${open.format('hh:mm a')} - ${close.format('hh:mm a')}`
    return { ...oh, ...result }
  })
}

export const getOpenCloseStatus = (hours, timezone) => {
  const now = moment.tz(timezone)
  const todaysHours = hours.filter(
    h => h.day === now.format('dddd').toLowerCase()
  )

  const result = todaysHours
    .map(h => {
      const openTime = h.open.clone()
      const closeTime = h.close.clone()

      if (closeTime < openTime) {
        closeTime.add(1, 'day')
      }

      const openingSoonTime = openTime.clone().add(-30, 'minutes')
      const closingSoonTime = closeTime.clone().add(-30, 'minutes')

      if (now.isBetween(openingSoonTime, openTime)) {
        return 'opening_soon'
      } else if (now.isBetween(closingSoonTime, closeTime)) {
        return 'closing_soon'
      } else if (now.isBetween(openTime, closeTime)) {
        return 'open'
      }

      return null
    })
    .filter(h => !!h)

  if (result.length > 0) {
    return result[0]
  }

  return 'closed'
}
