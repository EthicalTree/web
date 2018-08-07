import store from 'store'
import axios from 'axios'
import FileDownload from 'js-file-download'
import { error } from '../utils/notifications'

// Set header for camelcasing keys automatically
axios.defaults.headers.common['X-Key-Inflection'] = 'camel'

const ERRORS = [500]

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

// AXIOS API WRAPPER
const wrapper = (method, url, config={}) => {
  return axios({
    method,
    url: apiRoute(url),
    ...config
  })
    .catch(err => {
    const status = err.response && err.response.status

    if (ERRORS.includes(status)) {
      error()
    }

    throw err
  })
}

const get = (url, config) => { return wrapper('get', url, config) }
const _delete = (url, config) => { return wrapper('delete', url, config) }
const head = (url, config) => { return wrapper('head', url, config) }
const options = (url, config) => { return wrapper('options', url, config) }
const post = (url, data, config) => { return wrapper('post', url, {...config, data}) }
const put = (url, data, config) => { return wrapper('put', url, {...config, data}) }
const patch = (url, data, config) => { return wrapper('patch', url, {...config, data}) }

const all = requests => axios.all(requests)
const spread = func => axios.spread(func)

const download = (url, filename, config, method) => {
  return wrapper(
    method || 'get',
    url, {
      responseType: 'blob',
      noCamelize: true,
      ...config
    }
  ).then(response => {
    FileDownload(response.data, filename)
  })
}

const api = {
  all,
  get,
  delete: _delete,
  download,
  head,
  options,
  post,
  put,
  patch,
  spread,
}

export {
  api,
  apiRoute,
  authenticate,
  deauthenticate
}

