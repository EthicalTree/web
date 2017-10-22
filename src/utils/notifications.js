import 'noty/lib/noty.css'
import Noty from 'noty'

let stack = []

const notify = (options) => {
  const newNoty = new Noty({
    layout: 'bottomRight',
    timeout: 3000,
    theme: 'sunset',
    ...options
  }).show()

  const exists = stack.find(note => note.type === newNoty.type)

  if (exists) {
    exists.close()
  }

  stack = [...stack, newNoty]
}

const info = (text, options={}) => {
  return notify({ ...options, type: 'info', text })
}

const warn = (text, options={}) => {
  return notify({ ...options, type: 'warn', text })
}

const error = (msg, options={}) => {
  const text = msg || "Something broke, sorry about that!"
  return notify({ ...options, type: 'error', text })
}

const success = (msg, options={}) => {
  const text = msg || "Success!"
  return notify({ ...options, type: 'success', text })
}

export {
  notify,
  info,
  warn,
  error,
  success
}
