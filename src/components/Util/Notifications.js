import Noty from 'noty'

const notify = (options) => {
  return new Noty(options).show()
}

const info = (text, options={}) => {
  return notify({ ...options, type: 'info', text })
}

const warn = (text, options={}) => {
  return notify({ ...options, type: 'warn', text })
}

const error = (text, options={}) => {
  return notify({ ...options, type: 'error', text })
}

const success = (text, options={}) => {
  return notify({ ...options, type: 'success', text })
}

export {
  notify,
  info,
  warn,
  error,
  success
}
