import store from 'store'

const config = store.get('ET_CONFIG')

export const isToolbarEnabled = () => {
  return process.env.NODE_ENV === 'development' || !!config
}
