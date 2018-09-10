window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    }
  }

jest.mock('bugsnag-js', () => () => ({
  use(plugin) {
    const boundary = plugin.init()
    delete boundary.prototype.componentDidCatch
    return boundary
  },
}))
