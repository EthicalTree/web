
export const a11yClick = func => {
  return event => {
    if (event.key === 'Enter' || !event.key) {
      func(event)
    }
  }
}

export const keyPressed = (key, func) => {
  return event => {
    if (event.key === key) {
      func(event)
    }
  }
}

