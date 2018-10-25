import startCase from 'lodash/startCase'

export const toTitleCase = str => {
  return str
    .split(', ')
    .map(s => startCase(s))
    .join(', ')
}

export const squish = str => {
  return str.replace(/\s+/g, ' ').trim()
}

export const escapeRegex = str => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
