import startCase from 'lodash/startCase'

export const toTitleCase = str => {
  return str
    .split(', ')
    .map(s => startCase(s))
    .join(', ')
}
