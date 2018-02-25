const safeFunc = (event, func) => {
  if (func) {
    func(event)
  }
}

export const a11yClick = func => {
  return event => {
    if (event.key === 'Enter' || !event.key) {
      safeFunc(event, func)
    }
  }
}

export const keyPressed = (key, func) => {
  return event => {
    if (event.key === key) {
      safeFunc(event, func)
    }
  }
}

export const blurClick = func => {
  return event => {
    if (event.currentTarget) {
      event.currentTarget.blur()
      safeFunc(event, func)
    }
  }
}
