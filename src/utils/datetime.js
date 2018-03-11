import moment from 'moment-timezone'

export const getOpenCloseStatus = hours => {
  const now = moment()
  const todaysHours = hours.filter(h => h.day === now.format('dddd').toLowerCase())

  const result = todaysHours.map(h => {
    const openTime = moment(h.openStr, 'hh:mm a')
    const closeTime = moment(h.closeStr, 'hh:mm a')
    const openingSoonTime = moment(openTime).add(-30, 'minutes')
    const closingSoonTime = moment(closeTime).add(-30, 'minutes')

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
