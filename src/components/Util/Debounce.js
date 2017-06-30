function _debounce(callback, wait, context = this) {
  let timeout = null
  let callbackArgs = null

  const later = () => callback.apply(context, callbackArgs)

  return function() {
    callbackArgs = arguments
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default function debounce(...args) {
  const debounced = _debounce(...args)
  return function (e) {
    e.persist()
    return debounced(e)
  }
}

/**
 * Normal event
 * event      | |      |
 * time     ----------------
 * callback   | |      |
 *
 * Call log only when it's been 100ms since the last sroll
 * scroll     | |      |
 * time     ----------------
 * callback         |      |
 *              |100|  |100|
 */

/* usage
const handleScroll = debounce((e) => {
  console.log('Window scrolled.')
}, 100)
window.addEventListener('scroll', handleScroll)
*/
