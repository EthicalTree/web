import store from 'store'
import axios from 'axios'

const apiRoute = (path) => {
  return `${process.env.REACT_APP_API_URL}${path}`
}

const authenticate = (jwt) => {
  store.set('ETHICALTREE_AUTH_TOKEN', jwt)
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`
}

const deauthenticate = () => {
  store.remove('ETHICALTREE_AUTH_TOKEN')
  axios.defaults.headers.common['Authorization'] = ''
}

export {
  apiRoute,
  authenticate,
  deauthenticate
}

